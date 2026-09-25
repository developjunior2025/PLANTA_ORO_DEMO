/**
 * Catálogo maestro de dashboards — megadocumento REV.01 §64 (20 dashboards) y §64.2
 * (matriz rol → dashboard inicial). Cada KPI declara su procedencia:
 *  - real:    calculado ahora mismo desde PostgreSQL (GET /api/v1/kpis)
 *  - ejemplo: valor ilustrativo; su fuente de autoridad (SCADA, NMS, LIMS, Odoo…) aún no está conectada
 *  - sin fuente: no existe forma de calcularlo todavía (ej. accesos, sin autenticación real)
 */
import type { KpisResponse } from "../shared/api";

export interface KpiSpec {
  label: string;
  /** Ruta dentro de la respuesta de /kpis (ej. "fur.avgQuality"). Si existe, el KPI es real. */
  path?: string;
  suffix?: string;
  prefix?: string;
  /** Valor de ejemplo cuando no hay dato real. */
  demo?: string;
  none?: boolean;
  /** Fuente de autoridad que indica el megadocumento (§64.3) o el sistema que hoy aporta el dato. */
  source: string;
  /** Drill-down hacia el registro que explica el número. */
  to?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

export interface SeriesLine {
  key: string;
  name: string;
  color: string;
  type?: "bar" | "line" | "area";
  axis?: "left" | "right";
}

export type WidgetSpec =
  | { kind: "chart"; title: string; series: string; x: string; ys: SeriesLine[]; unit?: string }
  | { kind: "hbars"; title: string; series: string }
  | { kind: "matrix"; title: string; series: string }
  | { kind: "kpiBars"; title: string; items: { label: string; path: string; color?: string }[] }
  | { kind: "records"; title: string; domains: string[]; preset?: Record<string, string> }
  | { kind: "audit"; title: string; type?: string }
  | { kind: "holds"; title: string }
  | { kind: "maturity"; title: string }
  | { kind: "docs"; title: string }
  | { kind: "gantt"; title: string }
  | { kind: "stock"; title: string };

export interface DashboardSpec {
  code: string; // FUR-DASH-XXX-001
  slug: string; // ruta: /app/dashboards/:slug (nombres del documento maestro de dashboards §6)
  short: string;
  title: string;
  audience: string;
  refresh: string;
  visualization: string;
  ownerRole: string;
  kpis: KpiSpec[];
  widgets: WidgetSpec[];
}

const GOLD = "#f5a623";
const NAVY = "#123063";
const GREEN = "#1f9d55";
const RED = "#d64545";

const L = (label: string, source: string, demo: string, extra: Partial<KpiSpec> = {}): KpiSpec => ({ label, source, demo, ...extra });
const R = (label: string, path: string, source: string, extra: Partial<KpiSpec> = {}): KpiSpec => ({ label, path, source, ...extra });
const N = (label: string, source: string): KpiSpec => ({ label, source, none: true });

export const DASHBOARDS: DashboardSpec[] = [
  {
    code: "FUR-DASH-PUB-001", slug: "tiempo-real", short: "PUB", title: "Estado Público de Planta", audience: "Público",
    refresh: "5–15 min", visualization: "Tarjetas KPI + tendencia 24h + estado general", ownerRole: "Visitante",
    kpis: [
      L("Producción autorizada", "Historian/WIT", "3,450 t/d"),
      L("Disponibilidad", "MNT/Operación", "95.2%", { tone: "success" }),
      L("Seguridad (días sin incidentes)", "HSE", "47 días", { tone: "success" }),
      L("Sostenibilidad (agua recirculada)", "Operación", "82%"),
    ],
    widgets: [{ kind: "chart", title: "Tendencia de producción (24 h)", series: "production_trend_24h", x: "hour", unit: " t/h", ys: [{ key: "tonPerHour", name: "Producción", color: GOLD, type: "area" }] }],
  },
  {
    code: "FUR-DASH-EXE-001", slug: "ejecutivo", short: "EXE", title: "Ejecutivo Corporativo", audience: "Dirección",
    refresh: "15–60 min", visualization: "Scorecards + waterfall + tendencias + semáforos", ownerRole: "Gerencia General / Dirección",
    kpis: [
      L("Producción", "Historian/WIT", "3,450 t/d"),
      L("Recuperación", "LAB/Balance metalúrgico", "88.6%", { tone: "success" }),
      L("Costo por tonelada", "LULO/Odoo", "USD 17.4/t"),
      L("Disponibilidad", "MNT/Operación", "95.2%", { tone: "success" }),
      R("CAPEX/OPEX (presupuesto vigente)", "budget.total", "LULO/Odoo", { prefix: "USD ", to: "/app/presupuestos" }),
      L("Seguridad (incidentes con tiempo perdido)", "HSE", "0", { tone: "success" }),
    ],
    widgets: [
      { kind: "chart", title: "Costo por tonelada y recuperación (6 meses)", series: "exe_trend", x: "label", ys: [
        { key: "costPerTon", name: "Costo USD/t", color: NAVY, type: "bar" },
        { key: "recoveryPct", name: "Recuperación %", color: GOLD, type: "line", axis: "right" },
      ] },
      { kind: "kpiBars", title: "Estructura de costos del presupuesto vigente (USD)", items: [
        { label: "Materiales", path: "budget.costByType.Materiales", color: NAVY },
        { label: "Equipos", path: "budget.costByType.Equipos", color: GOLD },
        { label: "Mano de obra", path: "budget.costByType.Mano de Obra", color: GREEN },
        { label: "Otros", path: "budget.costByType.Otros", color: "#9aa5b4" },
      ] },
    ],
  },
  {
    code: "FUR-DASH-GPL-001", slug: "planta", short: "GPL", title: "Gerencia de Planta", audience: "Gerente de Planta",
    refresh: "1–5 min", visualization: "KPI + proceso + Pareto + eventos", ownerRole: "Gerente de Planta",
    kpis: [
      L("Producción", "Historian/WIT", "3,450 t/d"),
      L("Recuperación", "LAB/Balance metalúrgico", "88.6%"),
      L("OEE", "Operación + Calidad", "76.4%"),
      L("Disponibilidad", "MNT/Operación", "95.2%", { tone: "success" }),
      L("Alarmas activas", "SCADA/Historian", "12", { tone: "warning", to: "/app/alertas" }),
      L("Backlog de mantenimiento", "MNT", "18 OT", { to: "/app/mantenimiento" }),
      R("Fichas con HOLD abierto", "fur.recordsWithHold", "FUR", { tone: "warning", to: "/app/alertas" }),
    ],
    widgets: [
      { kind: "chart", title: "OEE y disponibilidad (7 días)", series: "gpl_oee", x: "label", unit: "%", ys: [
        { key: "oee", name: "OEE %", color: GOLD, type: "bar" },
        { key: "availability", name: "Disponibilidad %", color: NAVY, type: "line" },
      ] },
      { kind: "chart", title: "Pareto de fallas (90 días)", series: "failure_pareto", x: "cause", ys: [
        { key: "count", name: "Fallas", color: NAVY, type: "bar" },
        { key: "cumulativePct", name: "% acumulado", color: GOLD, type: "line", axis: "right" },
      ] },
      { kind: "audit", title: "Eventos recientes (auditoría real)" },
    ],
  },
  {
    code: "FUR-DASH-MET-001", slug: "procesos", short: "MET", title: "Metalurgia / Procesos", audience: "Metalurgista",
    refresh: "1–5 min", visualization: "Tendencias + balance + correlaciones IoT/CC/LAB", ownerRole: "Metalurgista / Procesos",
    kpis: [
      L("Tonelaje", "Historian/WIT", "3,450 t/d"),
      L("P80", "LAB", "150 µm"),
      L("% sólidos", "SCADA", "39%"),
      L("pH", "SCADA", "10.7"),
      L("ORP", "SCADA", "−120 mV"),
      L("NaCN", "SCADA/LAB", "320 ppm"),
      L("Recuperación", "LAB/Balance metalúrgico", "88.6%"),
      L("Au solución / carbón", "LAB", "0.8 / 4,200 g/t"),
    ],
    widgets: [
      { kind: "chart", title: "% sólidos y pH (24 h)", series: "met_process_24h", x: "label", ys: [
        { key: "solidsPct", name: "% sólidos", color: NAVY, type: "bar" },
        { key: "ph", name: "pH", color: GOLD, type: "line", axis: "right" },
      ] },
      { kind: "chart", title: "Toneladas y recuperación (7 días)", series: "tonnage_last_7_days", x: "day", ys: [
        { key: "tons", name: "Toneladas", color: GOLD, type: "bar" },
        { key: "recoveryPct", name: "Recuperación %", color: NAVY, type: "line", axis: "right" },
      ] },
    ],
  },
  {
    code: "FUR-DASH-OPR-001", slug: "operacion", short: "OPR", title: "Operación de Planta", audience: "Operador",
    refresh: "5–30 s", visualization: "Mímico resumido + alarmas + trend", ownerRole: "Operador de Planta",
    kpis: [
      L("Variables críticas en rango", "SCADA/Historian", "41 / 44"),
      L("Setpoints fuera de consigna", "SCADA", "2", { tone: "warning" }),
      L("Alarmas activas", "SCADA/Historian", "12", { tone: "warning", to: "/app/alertas" }),
      R("Fichas en estado Operativo", "fur.byStatus.Operativo", "FUR", { to: "/app/activos" }),
      L("Producción del turno", "Historian/WIT", "1,235 t"),
    ],
    widgets: [
      { kind: "matrix", title: "Estado de instrumentos críticos", series: "iot_health" },
      { kind: "hbars", title: "Producción por turno (t)", series: "opr_shift" },
      { kind: "chart", title: "Tendencia de producción (24 h)", series: "production_trend_24h", x: "hour", unit: " t/h", ys: [{ key: "tonPerHour", name: "Producción", color: GOLD, type: "area" }] },
    ],
  },
  {
    code: "FUR-DASH-PTE-001", slug: "potencia", short: "PTE", title: "Potencia Eléctrica", audience: "Eléctrica",
    refresh: "5–30 s", visualization: "Unifilar resumido + tendencias + eventos", ownerRole: "Potencia eléctrica",
    kpis: [
      L("kW / kVA", "SCADA/Historian", "5,820 / 6,240"),
      L("Demanda", "SCADA/Historian", "6.6 kV"),
      L("Factor de potencia", "SCADA/Historian", "0.93"),
      L("THD", "SCADA/Historian", "3.4%"),
      L("Trips (24 h)", "SCADA/Historian", "2", { tone: "warning" }),
      L("Disponibilidad MCC/VFD", "PTE", "99.1%", { tone: "success" }),
      R("Fichas PTE registradas", "fur.byDomain.PTE", "FUR", { to: "/app/redes/pte" }),
    ],
    widgets: [
      { kind: "chart", title: "Factor de potencia y THD (24 h)", series: "pte_pf_24h", x: "label", ys: [
        { key: "pf", name: "PF", color: NAVY, type: "bar" },
        { key: "thd", name: "THD %", color: RED, type: "line", axis: "right" },
      ] },
      { kind: "chart", title: "Demanda eléctrica (24 h)", series: "power_demand_24h", x: "hour", unit: " kV", ys: [{ key: "kv", name: "Demanda", color: NAVY, type: "area" }] },
      { kind: "records", title: "Activos de Potencia Eléctrica (fichas FUR reales)", domains: ["PTE"] },
    ],
  },
  {
    code: "FUR-DASH-IOT-001", slug: "iot", short: "IOT", title: "Instrumentación / OT", audience: "IOT",
    refresh: "10–60 s", visualization: "Health matrix + trends + alarmas", ownerRole: "Técnico / Instrumentista",
    kpis: [
      L("Disponibilidad de instrumentos", "SCADA/Historian", "92%"),
      L("Calidad de señal (Good)", "SCADA/Historian", "96%"),
      L("Calibraciones vencidas", "IOT", "2", { tone: "warning" }),
      L("Tags offline", "SCADA/Historian", "1", { tone: "warning" }),
      L("Latencia media", "SCADA/Historian", "38 ms"),
      R("Fichas IOT registradas", "fur.byDomain.IOT", "FUR", { to: "/app/redes/iot" }),
    ],
    widgets: [
      { kind: "matrix", title: "Matriz de salud de instrumentos", series: "iot_health" },
      { kind: "records", title: "Instrumentos (fichas FUR reales)", domains: ["IOT"] },
    ],
  },
  {
    code: "FUR-DASH-GPON-001", slug: "gpon", short: "GPON", title: "GPON / Comunicaciones", audience: "Telecom",
    refresh: "30–60 s", visualization: "Topología + heatmap óptico + eventos", ownerRole: "Telecom / GPON",
    kpis: [
      L("ONU online", "NMS GPON", "246 / 248", { tone: "success" }),
      L("Rx / Tx medio", "NMS GPON", "−21.4 / +3.0 dBm"),
      L("Pérdida óptica", "NMS GPON", "24.4 dB"),
      L("Margen óptico", "NMS GPON", "3.6 dB"),
      L("Latencia", "NMS GPON", "1.8 ms"),
      L("Puertos PON en uso", "NMS GPON", "26 / 32"),
      L("OTDR pendientes", "GPON", "1", { tone: "warning" }),
      R("Fichas GPON registradas", "fur.byDomain.GPON", "FUR", { to: "/app/redes/gpon" }),
    ],
    widgets: [
      { kind: "hbars", title: "Potencia Rx por ONU (dBm) — verde ok, ámbar límite, rojo bajo margen", series: "gpon_rx" },
      { kind: "records", title: "Equipos GPON (fichas FUR reales)", domains: ["GPON"] },
    ],
  },
  {
    code: "FUR-DASH-CC-001", slug: "calidad", short: "CC", title: "Control de Calidad", audience: "QA/QC",
    refresh: "5–15 min", visualization: "Pipeline muestras + Pareto + estado custodia", ownerRole: "Laboratorio / Calidad",
    kpis: [
      L("Muestras tomadas", "CC", "64"),
      L("Muestras pendientes", "CC", "9", { tone: "warning" }),
      L("Cadena de custodia completa", "CC", "97%", { tone: "success" }),
      L("No conformidades", "CC", "1", { tone: "warning" }),
      L("Duplicados / blancos", "LAB/CC", "6 / 4"),
      R("Fichas CC registradas", "fur.byDomain.CC", "FUR", { to: "/app/laboratorio" }),
    ],
    widgets: [
      { kind: "hbars", title: "Pipeline de muestras", series: "cc_pipeline" },
      { kind: "records", title: "Muestras (fichas FUR reales)", domains: ["CC"] },
    ],
  },
  {
    code: "FUR-DASH-LAB-001", slug: "laboratorio", short: "LAB", title: "Laboratorio", audience: "Laboratorio",
    refresh: "5–15 min", visualization: "Cola laboratorio + control charts + KPI", ownerRole: "Laboratorio / Calidad",
    kpis: [
      L("TAT laboratorio", "LAB", "22 h"),
      L("Muestras pendientes", "LAB", "9", { tone: "warning" }),
      L("QA/QC aceptación", "LAB/CC", "98%", { tone: "success" }),
      L("Equipos operativos", "LAB", "11 / 12"),
      L("Calibraciones vigentes", "LAB", "100%"),
      L("Resultados fuera de control", "LAB", "1", { tone: "warning" }),
      R("Fichas LAB registradas", "fur.byDomain.LAB", "FUR", { to: "/app/laboratorio" }),
    ],
    widgets: [
      { kind: "chart", title: "TAT por día (h)", series: "lab_tat", x: "label", unit: " h", ys: [{ key: "tat", name: "TAT", color: NAVY, type: "bar" }] },
      { kind: "hbars", title: "Muestras por estado", series: "lab_samples_by_status" },
      { kind: "records", title: "Análisis (fichas FUR reales)", domains: ["LAB"] },
    ],
  },
  {
    code: "FUR-DASH-MNT-001", slug: "mantenimiento", short: "MNT", title: "Mantenimiento", audience: "Mantenimiento",
    refresh: "5–15 min", visualization: "Pareto fallas + Gantt + backlog + condición", ownerRole: "Jefe de Mantenimiento",
    kpis: [
      L("Disponibilidad", "MNT/Operación", "95.2%", { tone: "success" }),
      R("MTBF (referencial de la ficha)", "mnt.mtbf", "MNT", { suffix: " h", to: "/app/mantenimiento" }),
      L("MTTR", "MNT", "6.5 h"),
      L("Backlog", "MNT", "18 OT"),
      L("Cumplimiento PM", "MNT", "86%", { tone: "success" }),
      R("Repuestos críticos bajo reorden", "stock.criticalBelow", "WMS", { tone: "warning", to: "/app/inventario" }),
      R("Fichas MNT registradas", "fur.byDomain.MNT", "FUR", { to: "/app/mantenimiento" }),
    ],
    widgets: [
      { kind: "chart", title: "Pareto de fallas (90 días)", series: "failure_pareto", x: "cause", ys: [
        { key: "count", name: "Fallas", color: NAVY, type: "bar" },
        { key: "cumulativePct", name: "% acumulado", color: GOLD, type: "line", axis: "right" },
      ] },
      { kind: "gantt", title: "Próximas órdenes de trabajo" },
      { kind: "chart", title: "Backlog de OT (6 semanas)", series: "mnt_backlog", x: "label", ys: [
        { key: "open", name: "Abiertas", color: RED, type: "bar" },
        { key: "closed", name: "Cerradas", color: GREEN, type: "bar" },
      ] },
      { kind: "records", title: "Planes de mantenimiento (fichas FUR reales)", domains: ["MNT"] },
    ],
  },
  {
    code: "FUR-DASH-WMS-001", slug: "wms", short: "WMS", title: "WMS / Inventario", audience: "Almacén",
    refresh: "5–15 min", visualization: "KPI + ABC + aging + mapa almacén", ownerRole: "Almacén / Logística",
    kpis: [
      R("Ítems críticos en catálogo", "stock.criticalTotal", "WMS", { to: "/app/inventario" }),
      L("Rotación", "WMS", "3.2 vueltas/año"),
      R("Quiebres (críticos bajo reorden)", "stock.criticalBelow", "WMS", { tone: "warning", to: "/app/inventario" }),
      L("Reservas", "WMS", "4"),
      R("Movimientos registrados", "stock.movements", "WMS", { to: "/app/inventario" }),
      L("Exactitud de inventario", "WMS", "98.7%"),
      R("Stockout crítico", "stock.stockoutCriticalPct", "WMS", { suffix: "%", tone: "danger" }),
    ],
    widgets: [
      { kind: "stock", title: "Ítems bajo punto de reorden (stock real)" },
      { kind: "hbars", title: "Clasificación ABC (ejemplo)", series: "wms_abc" },
    ],
  },
  {
    code: "FUR-DASH-BUY-001", slug: "compras", short: "BUY", title: "Compras / Abastecimiento", audience: "Compras",
    refresh: "15–60 min", visualization: "Funnel sourcing + aging + proveedor", ownerRole: "Compras / Proveedores",
    kpis: [
      R("RQ abiertas", "procurement.rqOpen", "FUR-RQ", { to: "/app/requisiciones" }),
      R("Ofertas recibidas (RFQ)", "procurement.offers", "FUR-OF", { to: "/app/requisiciones" }),
      L("Lead time compra", "Odoo Purchase", "81 días"),
      L("Ahorro sourcing", "OF/PO", "6.4%"),
      L("OTIF proveedor", "Odoo Purchase", "88%"),
      L("PO pendientes", "Odoo Purchase", "7"),
    ],
    widgets: [
      { kind: "kpiBars", title: "Funnel de abastecimiento (fichas reales)", items: [
        { label: "Requisiciones (RQ)", path: "procurement.rqTotal", color: NAVY },
        { label: "RQ abiertas", path: "procurement.rqOpen", color: GOLD },
        { label: "Ofertas (OF)", path: "procurement.offers", color: GREEN },
      ] },
      { kind: "chart", title: "Lead time de compra por mes (días)", series: "buy_leadtime", x: "label", unit: " d", ys: [{ key: "days", name: "Lead time", color: NAVY, type: "bar" }] },
      { kind: "records", title: "Requisiciones y ofertas (fichas FUR reales)", domains: ["RQ", "OF"] },
    ],
  },
  {
    code: "FUR-DASH-CST-001", slug: "costos", short: "CST", title: "Presupuesto / Costos", audience: "Costos",
    refresh: "15–60 min", visualization: "Curva S + variación + estructura de costos", ownerRole: "Presupuesto / Costos",
    kpis: [
      R("Presupuesto base", "budget.total", "LULO/Odoo", { prefix: "USD ", to: "/app/presupuestos" }),
      L("Comprometido", "Odoo Purchase", "USD 61,400"),
      L("Real ejecutado", "Odoo/LULO", "USD 54,900"),
      L("Variación de presupuesto", "LULO/Odoo", "−8.1%"),
      R("Partidas (APU)", "budget.items", "LULO", { to: "/app/presupuestos" }),
      R("Capítulos", "budget.chapters", "LULO", { to: "/app/presupuestos" }),
    ],
    widgets: [
      { kind: "chart", title: "Curva S — avance acumulado planificado vs real (%)", series: "scurve", x: "label", unit: "%", ys: [
        { key: "planned", name: "Planificado", color: NAVY, type: "line" },
        { key: "real", name: "Real", color: GOLD, type: "line" },
      ] },
      { kind: "kpiBars", title: "Estructura de costos (USD, presupuesto real)", items: [
        { label: "Materiales", path: "budget.costByType.Materiales", color: NAVY },
        { label: "Equipos", path: "budget.costByType.Equipos", color: GOLD },
        { label: "Mano de obra", path: "budget.costByType.Mano de Obra", color: GREEN },
        { label: "Otros", path: "budget.costByType.Otros", color: "#9aa5b4" },
      ] },
    ],
  },
  {
    code: "FUR-DASH-ENG-001", slug: "ingenieria", short: "ENG", title: "Ingeniería / Proyectos", audience: "Ingeniería",
    refresh: "15–60 min", visualization: "Kanban + matriz madurez + documentos", ownerRole: "Ingeniería / Proyectos",
    kpis: [
      L("MOC abiertos", "ENG", "9"),
      R("Documentos en biblioteca", "catalog.documents", "Documentos", { to: "/app/documentos" }),
      L("Revisiones pendientes", "ENG", "6", { tone: "warning" }),
      R("Pendientes TBC", "fur.tbc", "FUR", { to: "/app/alertas" }),
      R("Pendientes HOLD", "fur.hold", "FUR", { tone: "danger", to: "/app/alertas" }),
      L("Avance de proyectos", "ENG", "72%"),
      L("Punch list abierto", "ENG", "14"),
    ],
    widgets: [
      { kind: "kpiBars", title: "Matriz de madurez D0–D5 (fichas reales)", items: [
        { label: "D2 · Preliminar", path: "fur.byMaturity.D2", color: RED },
        { label: "D3 · Validado", path: "fur.byMaturity.D3", color: GOLD },
        { label: "D4 · Operacional", path: "fur.byMaturity.D4", color: GREEN },
      ] },
      { kind: "hbars", title: "Kanban de MOC (ejemplo)", series: "eng_moc" },
    ],
  },
  {
    code: "FUR-DASH-HSE-001", slug: "hse", short: "HSE", title: "HSE / SSOMA", audience: "HSE",
    refresh: "5–15 min", visualization: "Mapa + incidentes + tendencias", ownerRole: "HSE / SSOMA",
    kpis: [
      L("Incidentes (mes)", "HSE", "1", { tone: "warning" }),
      L("Condiciones inseguras", "HSE", "7"),
      L("Permisos de trabajo activos", "HSE", "5"),
      R("Cámaras registradas", "fur.byDomain.CAM", "FUR-CAM", { to: "/app/redes/cam" }),
      L("Inspecciones cumplidas", "HSE", "94%", { tone: "success" }),
    ],
    widgets: [
      { kind: "chart", title: "Incidentes y condiciones inseguras (6 meses)", series: "hse_incidents", x: "label", ys: [
        { key: "unsafe", name: "Condiciones inseguras", color: GOLD, type: "bar" },
        { key: "incidents", name: "Incidentes", color: RED, type: "line" },
      ] },
      { kind: "matrix", title: "Estado de cámaras", series: "cam_health" },
    ],
  },
  {
    code: "FUR-DASH-CAM-001", slug: "camaras", short: "CAM", title: "Seguridad / CCTV", audience: "Seguridad",
    refresh: "5–30 s", visualization: "Video wall + mapa + health", ownerRole: "Seguridad / CCTV",
    kpis: [
      L("Cámaras online", "CAM", "7 / 8"),
      L("Storage utilizado", "CAM", "68%"),
      L("Analíticas activas", "CAM", "3"),
      L("Eventos (24 h)", "CAM", "11"),
      L("Cobertura de zonas críticas", "CAM", "92%"),
      R("Cámaras con ficha FUR", "fur.byDomain.CAM", "FUR-CAM", { to: "/app/redes/cam" }),
    ],
    widgets: [
      { kind: "matrix", title: "Salud de cámaras", series: "cam_health" },
      { kind: "records", title: "Cámaras (fichas FUR reales)", domains: ["CAM"] },
    ],
  },
  {
    code: "FUR-DASH-LMS-001", slug: "lms", short: "LMS", title: "Formación / LMS", audience: "Instructor",
    refresh: "15–60 min", visualization: "KPI + matriz competencias + calendario", ownerRole: "Instructor / Docente",
    kpis: [
      R("Cursos en catálogo", "catalog.courses", "LMS", { to: "/app/cursos" }),
      L("Progreso promedio", "LMS", "71%"),
      L("Vencimientos próximos", "LMS", "5", { tone: "warning" }),
      L("Certificaciones emitidas", "LMS", "38"),
      L("Competencias cubiertas", "LMS", "64%"),
    ],
    widgets: [{ kind: "hbars", title: "Progreso por curso (%)", series: "lms_progress" }],
  },
  {
    code: "FUR-DASH-SUP-001", slug: "proveedor", short: "SUP", title: "Portal Proveedor", audience: "Proveedor",
    refresh: "15–60 min", visualization: "Funnel comercial + tareas", ownerRole: "Proveedor / Vendedor",
    kpis: [
      L("RFQ recibidas", "Odoo Purchase", "18"),
      R("Ofertas registradas", "procurement.offers", "FUR-OF", { to: "/app/requisiciones" }),
      L("PO emitidas", "Odoo Purchase", "7"),
      L("Entregas cumplidas", "Odoo Purchase", "5"),
      L("Score de proveedor", "Compras", "4.7 / 5"),
    ],
    widgets: [
      { kind: "hbars", title: "Funnel comercial (ejemplo)", series: "sup_funnel" },
      { kind: "records", title: "Ofertas (fichas FUR reales)", domains: ["OF"] },
    ],
  },
  {
    code: "FUR-DASH-AUD-001", slug: "auditoria", short: "AUD", title: "Auditoría y Gobierno", audience: "Auditor",
    refresh: "15–60 min", visualization: "Timeline + matrices + excepciones", ownerRole: "Administrador FUR / Auditor",
    kpis: [
      R("Cambios auditados", "audit.total", "FUR (AuditEvent)"),
      N("Accesos", "IAM — sin autenticación real aún"),
      L("Aprobaciones pendientes", "FUR", "2", { tone: "warning" }),
      R("Completitud FUR (promedio)", "fur.avgQuality", "FUR", { suffix: "%" }),
      R("Madurez D4+", "fur.d4plusPct", "FUR", { suffix: "%" }),
      R("Pendientes TBC / HOLD", "fur.tbc", "FUR", { to: "/app/alertas" }),
      R("Fichas totales", "fur.total", "FUR", { to: "/app/catalogo" }),
    ],
    widgets: [
      { kind: "audit", title: "Timeline de cambios (auditoría real)" },
      { kind: "kpiBars", title: "Calidad del dato D0–D5 (fichas reales)", items: [
        { label: "D2", path: "fur.byMaturity.D2", color: RED },
        { label: "D3", path: "fur.byMaturity.D3", color: GOLD },
        { label: "D4", path: "fur.byMaturity.D4", color: GREEN },
      ] },
    ],
  },
];

/** Slugs abreviados de la primera versión: se redirigen a los del documento maestro de dashboards. */
export const LEGACY_SLUGS: Record<string, string> = {pub: "tiempo-real", exe: "ejecutivo", gpl: "planta", met: "procesos", opr: "operacion", pte: "potencia", iot: "iot", gpon: "gpon", cc: "calidad", lab: "laboratorio", mnt: "mantenimiento", wms: "wms", buy: "compras", cst: "costos", eng: "ingenieria", hse: "hse", cam: "camaras", lms: "lms", sup: "proveedor", aud: "auditoria"};

/** El dashboard público vive fuera de /app (documento de dashboards §6: /planta/tiempo-real). */
export const dashboardPath = (slug: string) => (slug === "tiempo-real" ? "/planta/tiempo-real" : `/app/dashboards/${slug}`);

/** Redes FUR cuyas fichas alimentan la tabla de detalle de cada dashboard (§4.4 / sección 7). */
export const TABLE_DOMAINS: Record<string, string[]> = {
  "tiempo-real": [], ejecutivo: [], planta: ["PROC", "MNT", "PTE", "IOT"], procesos: ["PROC", "CC", "LAB"],
  operacion: ["PROC", "IOT"], potencia: ["PTE"], iot: ["IOT"], gpon: ["GPON"], calidad: ["CC"], laboratorio: ["LAB"],
  mantenimiento: ["MNT"], wms: [], compras: ["RQ", "OF"], costos: [], ingenieria: [], hse: [], camaras: ["CAM"],
  lms: [], proveedor: ["OF"], auditoria: [],
};

export function getDashboard(slug: string): DashboardSpec | undefined {
  const key = LEGACY_SLUGS[slug] ?? slug;
  return DASHBOARDS.find((d) => d.slug === key);
}

/** Resuelve "a.b.c" contra la respuesta de /kpis. */
export function resolvePath(obj: unknown, path: string): number | string | undefined {
  let cur: unknown = obj;
  for (const part of path.split(".")) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "number" || typeof cur === "string" ? cur : undefined;
}

export type Provenance = "real" | "ejemplo" | "sin-fuente";

/** Procedencia de un KPI: real si existe en la respuesta de /kpis, sin fuente si no puede calcularse. */
export function kpiProvenance(k: KpiSpec, kpis: KpisResponse | null): Provenance {
  if (k.none) return "sin-fuente";
  if (k.path && kpis && resolvePath(kpis, k.path) !== undefined) return "real";
  return "ejemplo";
}
