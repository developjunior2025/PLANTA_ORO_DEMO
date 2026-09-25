/**
 * Filtros globales de dashboard (documento maestro de dashboards §4.2/§16) que sí se pueden aplicar
 * con los datos reales de FUR. Los filtros de planta única, turno y proveedor no tienen dimensión
 * cargada, así que no se ofrecen (ver `unsupported` en las respuestas).
 */
export interface FurFilter {
  domain: string[];
  area?: string;
  stage?: string;
  criticality?: string;
  status?: string;
  condition?: string;
  maturity?: string;
  q?: string;
}

export const FILTER_KEYS = ["domain", "area", "stage", "criticality", "status", "condition", "maturity", "q"] as const;

export function parseFurFilter(query: Record<string, string | undefined>): FurFilter {
  const pick = (k: string) => (query[k] && query[k] !== "" ? query[k] : undefined);
  return {
    domain: pick("domain")?.split(",").filter(Boolean) ?? [],
    area: pick("area"),
    stage: pick("stage"),
    criticality: pick("criticality"),
    status: pick("status"),
    condition: pick("condition"),
    maturity: pick("maturity"),
    q: pick("q")?.toLowerCase(),
  };
}

export function activeFilters(f: FurFilter): Record<string, string> {
  const out: Record<string, string> = {};
  if (f.domain.length) out.domain = f.domain.join(",");
  for (const k of ["area", "stage", "criticality", "status", "condition", "maturity", "q"] as const) {
    if (f[k]) out[k] = f[k]!;
  }
  return out;
}

interface Hold {
  level: string;
}
export interface FilterableFur {
  furCode: string;
  name: string;
  domain: string;
  area: string;
  zone: string;
  criticality: string;
  status: string;
  maturity: string;
  holds: unknown;
}

/** Condición del dato (§21): HOLD > TBC > Confirmado (D4/D5) > Referencial (D0–D3). */
export function conditionOf(r: Pick<FilterableFur, "maturity" | "holds">): string {
  const holds = r.holds as Hold[];
  if (holds.some((h) => h.level === "HOLD")) return "HOLD";
  if (holds.some((h) => h.level === "TBC")) return "TBC";
  return r.maturity === "D4" || r.maturity === "D5" ? "Confirmado" : "Referencial";
}

export function matchesFilter(r: FilterableFur, f: FurFilter): boolean {
  if (f.domain.length && !f.domain.includes(r.domain)) return false;
  if (f.area && r.area !== f.area) return false;
  if (f.stage && r.zone !== f.stage) return false;
  if (f.criticality && r.criticality !== f.criticality) return false;
  if (f.status && r.status !== f.status) return false;
  if (f.maturity && r.maturity !== f.maturity) return false;
  if (f.condition && conditionOf(r) !== f.condition) return false;
  if (f.q && !`${r.furCode} ${r.name}`.toLowerCase().includes(f.q)) return false;
  return true;
}
