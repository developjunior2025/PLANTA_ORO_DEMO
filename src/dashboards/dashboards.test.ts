import { describe, expect, it } from "vitest";
import type { DashboardKpis, KpiDefinition } from "../shared/api";
import { matchDefinition } from "./kpiMatch";
import { readKpi } from "./kpiReading";
import { DASHBOARDS, getDashboard, dashboardPath } from "./spec";
import { widgetsForSection } from "./sectionRules";

const def = (name: string): KpiDefinition => ({
  code: "K", dashboardCode: "D", name, description: "", unit: null, formula: null, owner: "x", version: "v0.1", approvalStatus: "Pendiente",
});

const kpisWith = (fur: Record<string, unknown>, condition = "Referential"): DashboardKpis =>
  ({ generatedAt: "", generated_at: "", dashboard_code: "D", filters: {}, data_quality: { condition, maturity: "D3" }, fur }) as DashboardKpis;

describe("matchDefinition", () => {
  it("empareja por similitud de nombre e ignora unidades entre paréntesis", () => {
    const d = [def("Disponibilidad global de planta (%)"), def("Recuperación Au")];
    expect(matchDefinition("Disponibilidad", d)?.name).toBe("Disponibilidad global de planta (%)");
    expect(matchDefinition("Recuperación", d)?.name).toBe("Recuperación Au");
  });
  it("no inventa una ficha cuando nada se parece", () => {
    expect(matchDefinition("Fichas con HOLD abierto", [def("Disponibilidad")])).toBeUndefined();
  });
});

describe("readKpi", () => {
  const real = { label: "HOLD", path: "fur.recordsWithHold", source: "FUR" };
  it("un KPI real sin respuesta del backend no muestra el valor de ejemplo", () => {
    expect(readKpi({ ...real, demo: "99" }, null).value).toBe("…");
  });
  it("lee el valor real y hereda la condición del dato", () => {
    const r = readKpi(real, kpisWith({ total: 5, recordsWithHold: 2 }, "HOLD"));
    expect(r).toMatchObject({ prov: "real", value: "2", quality: "hold" });
  });
  it("con filtros que dejan 0 fichas dice 'Sin datos' en vez de un cero engañoso", () => {
    expect(readKpi(real, kpisWith({ total: 0, recordsWithHold: 0 })).value).toBe("Sin datos");
  });
  it("los KPIs de ejemplo se marcan como tales", () => {
    expect(readKpi({ label: "OEE", source: "MNT", demo: "76%" }, null)).toMatchObject({ prov: "ejemplo", quality: "ejemplo" });
  });
});

describe("catálogo de dashboards", () => {
  it("tiene 20 dashboards con rutas únicas y el público en /planta/tiempo-real", () => {
    expect(DASHBOARDS).toHaveLength(20);
    expect(new Set(DASHBOARDS.map((d) => dashboardPath(d.slug))).size).toBe(20);
    expect(dashboardPath("tiempo-real")).toBe("/planta/tiempo-real");
  });
  it("resuelve los slugs abreviados antiguos", () => {
    expect(getDashboard("gpl")?.slug).toBe("planta");
    expect(getDashboard("cam")?.slug).toBe("camaras");
  });
});

describe("widgetsForSection", () => {
  it("las secciones con dato real devuelven widgets y el resto queda como 'sin dato'", () => {
    expect(widgetsForSection("auditoria", "TBC/HOLD")?.[0].kind).toBe("holds");
    expect(widgetsForSection("auditoria", "Madurez D0–D5")?.[0].kind).toBe("maturity");
    expect(widgetsForSection("gpon", "OLT")).toBeNull();
  });
});
