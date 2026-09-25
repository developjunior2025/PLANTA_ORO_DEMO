/**
 * Capa de acceso a datos del frontend: llama al backend real (NestJS + Prisma
 * + PostgreSQL en server/) por HTTP, siguiendo el contrato de la sección 11 del
 * plan ("Contrato API y BFF") — /api/v1/fur, /api/v1/catalog, etc. Ya no hay
 * arrays en memoria del navegador ni latencia simulada: si el backend no está
 * corriendo (`npm run dev` en server/), estas llamadas fallan de verdad.
 */
import type { CatalogEntity, DomainCode, FurDocument, FurHold, FurRecord } from "./types";
import type { StockItem } from "./wmsData";
import type { BudgetProject } from "./budgetData";

export interface LibraryDocument extends FurDocument {
  furCode: string;
  furName: string;
  domain: DomainCode;
}

export interface AuditEvent {
  id: string;
  subjectCode: string;
  eventType: string;
  description: string;
  createdAt: string;
}

export interface CreateFurInput {
  furCode: string;
  domain: DomainCode;
  name: string;
  family: string;
  zone: string;
  area: string;
  process: string;
  criticality?: string;
  manufacturer?: string;
  model?: string;
  supplier?: string;
}

export interface UpdateFurInput {
  status?: string;
  criticality?: string;
  maturity?: string;
  dataQualityPercent?: number;
  holds?: FurHold[];
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    if (res.status === 404) {
      throw new NotFoundError(path);
    }
    const body = await res.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message.join("; ") : (body?.message ?? `${res.status}`);
    throw new ApiError(message, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

const get = <T>(path: string, signal?: AbortSignal) => request<T>(path, { signal });
const post = <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) });
const patch = <T>(path: string, body: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(body) });

export class NotFoundError extends Error {
  constructor(path: string) {
    super(`No encontrado: ${path}`);
    this.name = "NotFoundError";
  }
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** GET /api/v1/fur/:furCode */
export async function fetchFurByCode(furCode: string): Promise<FurRecord | undefined> {
  try {
    return await get<FurRecord>(`/fur/${encodeURIComponent(furCode)}`);
  } catch (e) {
    if (e instanceof NotFoundError) return undefined;
    throw e;
  }
}

/** GET /api/v1/fur?domain=... */
export async function fetchFurList(domains?: DomainCode[]): Promise<FurRecord[]> {
  const query = domains && domains.length > 0 ? `?domain=${domains.join(",")}` : "";
  return get<FurRecord[]>(`/fur${query}`);
}

/** GET /api/v1/catalog */
export async function fetchCatalog(): Promise<CatalogEntity[]> {
  return get<CatalogEntity[]>("/catalog");
}

/** GET /api/v1/catalog/:furCode — detalle de una entidad del catálogo (curso, proveedor, servicio…) */
export async function fetchCatalogEntity(furCode: string): Promise<CatalogEntity | undefined> {
  try {
    return await get<CatalogEntity>(`/catalog/${encodeURIComponent(furCode)}`);
  } catch (e) {
    if (e instanceof NotFoundError) return undefined;
    throw e;
  }
}

/** GET /api/v1/fur/:furCode/relations */
export async function fetchFurRelations(furCode: string): Promise<FurRecord["relations"]> {
  return get<FurRecord["relations"]>(`/fur/${encodeURIComponent(furCode)}/relations`);
}

/** GET /api/v1/inventory — mapea conceptualmente a stock.quant de Odoo 19 nativo */
export async function fetchStock(): Promise<StockItem[]> {
  return get<StockItem[]>("/inventory");
}

/** GET /api/v1/lulo/projects/:code — motor presupuestario tipo LuloWin (§10/§14) */
export async function fetchBudgetProject(code = "LW-PROY-001"): Promise<BudgetProject> {
  return get<BudgetProject>(`/lulo/projects/${encodeURIComponent(code)}`);
}

/** GET /api/v1/documents — biblioteca técnica (Etapa 13.5), agregada desde cada FUR */
export async function fetchDocuments(): Promise<LibraryDocument[]> {
  return get<LibraryDocument[]>("/documents");
}

/** GET /api/v1/charts/:key — series cortas de referencia para los dashboards */
export async function fetchChartSeries<T>(key: string): Promise<T> {
  return get<T>(`/charts/${key}`);
}

/** POST /api/v1/fur — crea una ficha FUR real en la base de datos */
export async function createFur(input: CreateFurInput): Promise<FurRecord> {
  return post<FurRecord>("/fur", input);
}

/** PATCH /api/v1/fur/:furCode — edita una ficha FUR real (registra auditoría) */
export async function updateFur(furCode: string, input: UpdateFurInput): Promise<FurRecord> {
  return patch<FurRecord>(`/fur/${encodeURIComponent(furCode)}`, input);
}

/** GET /api/v1/fur/:furCode/audit — historial de auditoría real de la ficha */
export async function fetchAuditEvents(furCode: string): Promise<AuditEvent[]> {
  return get<AuditEvent[]>(`/fur/${encodeURIComponent(furCode)}/audit`);
}

/** PATCH /api/v1/inventory/:sku/movement — registra una entrada/salida/ajuste de stock real */
export async function registerStockMovement(
  sku: string,
  delta: number,
  reason: "Entrada" | "Salida" | "Ajuste",
  note?: string
): Promise<StockItem> {
  return patch<StockItem>(`/inventory/${encodeURIComponent(sku)}/movement`, { delta, reason, note });
}

/** GET /api/v1/health — estado real del backend, con latencia medida en el navegador */
export async function fetchHealth(): Promise<{ status: string; service: string; ms: number }> {
  const t0 = performance.now();
  const body = await get<{ status: string; service: string }>("/health");
  return { ...body, ms: Math.round(performance.now() - t0) };
}

/** GET /api/v1/kpis — KPIs calculados en vivo sobre PostgreSQL (megadocumento §64.3) */
export interface KpisResponse {
  generatedAt: string;
  [section: string]: unknown;
}
export async function fetchKpis(): Promise<KpisResponse> {
  return get<KpisResponse>("/kpis");
}

/** GET /api/v1/audit?limit= — eventos de auditoría recientes de todo el sistema */
export async function fetchAuditFeed(limit = 8): Promise<AuditEvent[]> {
  return get<AuditEvent[]>(`/audit?limit=${limit}`);
}

// ---------- Dashboards (documento maestro de dashboards §11, §12, §14) ----------

/** Filtros globales (§4.2) aplicados a los datos reales de FUR; viajan en la URL del navegador. */
export type DashboardFilters = Partial<
  Record<"domain" | "area" | "stage" | "criticality" | "status" | "condition" | "maturity" | "q" | "from" | "to", string>
>;

const qs = (f: DashboardFilters) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(f)) if (v) p.set(k, v);
  const s = p.toString();
  return s ? `?${s}` : "";
};

export interface KpiDefinition {
  code: string;
  dashboardCode: string;
  name: string;
  description: string;
  unit: string | null;
  formula: string | null;
  owner: string;
  version: string;
  approvalStatus: string;
}

export interface DashboardMeta {
  code: string;
  slug: string;
  route: string;
  roleCode: string;
  audience: string;
  domain: string;
  refresh: string;
  objective: string;
  drilldown: string;
  version: string;
  sections: { id: string; title: string }[];
  visualizations: string[];
  sources: string[];
  alerts: string[];
  actions: string[];
  kpiDefinitions: KpiDefinition[];
}

export async function fetchDashboardMeta(slug: string, signal?: AbortSignal): Promise<DashboardMeta> {
  return get<DashboardMeta>(`/dashboards/${encodeURIComponent(slug)}`, signal);
}

/** Envelope §11.1 + KPIs reales calculados con los filtros activos. */
export interface DashboardKpis extends KpisResponse {
  dashboard_code: string;
  generated_at: string;
  filters: Record<string, string>;
  data_quality: { condition: string; maturity: string | null };
}

export async function fetchDashboardKpis(slug: string, f: DashboardFilters, signal?: AbortSignal): Promise<DashboardKpis> {
  return get<DashboardKpis>(`/dashboards/${encodeURIComponent(slug)}/kpis${qs(f)}`, signal);
}

export async function fetchDashboardEvents(slug: string, f: DashboardFilters, limit = 20, signal?: AbortSignal): Promise<AuditEvent[]> {
  return get<AuditEvent[]>(`/dashboards/${encodeURIComponent(slug)}/events${qs({ from: f.from, to: f.to })}${f.from || f.to ? "&" : "?"}limit=${limit}`, signal);
}

export interface DashboardRow {
  furCode: string;
  name: string;
  domain: DomainCode;
  area: string;
  zone: string;
  status: string;
  criticality: string;
  maturity: string;
  dataQualityPercent: number;
  holds: FurHold[];
  condition: string;
}

export async function fetchDashboardTable(slug: string, f: DashboardFilters, signal?: AbortSignal): Promise<DashboardRow[]> {
  return get<DashboardRow[]>(`/dashboards/${encodeURIComponent(slug)}/table${qs(f)}`, signal);
}

export interface FilterOptions {
  domain: string[];
  area: string[];
  stage: string[];
  criticality: string[];
  status: string[];
  maturity: string[];
  condition: string[];
  unsupported: string[];
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  return get<FilterOptions>("/dashboards/filter-options");
}

/** Registra en auditoría una exportación (§17: toda exportación sensible queda auditada). */
export async function logDashboardExport(slug: string, scope: string, filters: DashboardFilters, actor: string) {
  return post<{ id: string }>(`/dashboards/${encodeURIComponent(slug)}/export-log`, {
    format: "csv",
    scope,
    filters: decodeURIComponent(qs(filters).slice(1)),
    actor,
  });
}
