import type { DashboardKpis } from "../shared/api";
import { kpiProvenance, resolvePath, type KpiSpec, type Provenance } from "./spec";

export const PROV_LABEL: Record<Provenance, string> = {
  real: "Real · desde la base",
  ejemplo: "Ejemplo · fuente pendiente",
  "sin-fuente": "Sin fuente",
};

export type Quality = "confirmado" | "referencial" | "tbc" | "hold" | "ejemplo" | "sin-dato";

export const fmt = (n: number | string) => (typeof n === "number" ? n.toLocaleString("es") : n);

export interface KpiReading {
  prov: Provenance;
  value: string;
  raw?: number;
  quality: Quality;
}

/** Lectura de un KPI: valor mostrado, procedencia y condición del dato. */
export function readKpi(kpi: KpiSpec, kpis: DashboardKpis | null): KpiReading {
  // KPI real aún sin respuesta del backend: no se muestra el valor de ejemplo como si fuera el dato.
  if (kpi.path && !kpis) return { prov: "real", value: "…", quality: "sin-dato" };
  const prov = kpiProvenance(kpi, kpis);
  if (prov === "sin-fuente") return { prov, value: "—", quality: "sin-dato" };
  if (prov === "ejemplo") return { prov, value: kpi.demo ?? "—", quality: "ejemplo" };
  const raw = resolvePath(kpis, kpi.path!);
  const fur = (kpis?.fur as { total?: number } | undefined)?.total;
  if (kpi.path!.startsWith("fur.") && fur === 0) return { prov, value: "Sin datos", quality: "sin-dato" };
  const c = kpis?.data_quality.condition;
  const quality: Quality = c === "HOLD" ? "hold" : c === "TBC" ? "tbc" : "referencial";
  return {
    prov,
    value: `${kpi.prefix ?? ""}${fmt(raw as number | string)}${kpi.suffix ?? ""}`,
    raw: typeof raw === "number" ? raw : undefined,
    quality,
  };
}

