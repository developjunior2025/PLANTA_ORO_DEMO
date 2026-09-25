import { TABLE_DOMAINS, type WidgetSpec } from "./spec";

/** Secciones comunes a todos los dashboards (documento de dashboards §4.4–§4.7 y sección 10 de cada §8.x.3). */
export const COMMON_SECTIONS = [
  { id: "c-tabla", title: "Tabla de detalle" },
  { id: "c-eventos", title: "Eventos y excepciones" },
  { id: "c-trazabilidad", title: "Trazabilidad" },
  { id: "c-acciones", title: "Acciones rápidas" },
  { id: "c-ayuda", title: "Ayuda y definiciones" },
] as const;

/**
 * Qué datos reales pueden respaldar una sección del menú contextual. Devuelve los widgets a mostrar,
 * o null cuando no existe hoy ninguna fuente conectada (entonces se muestra el estado "Sin dato" del §21).
 */
export function widgetsForSection(slug: string, title: string): WidgetSpec[] | null {
  const domains = TABLE_DOMAINS[slug] ?? [];
  if (/tbc\s*\/\s*hold/i.test(title)) return [{ kind: "holds", title: "Fichas con TBC / HOLD abiertos" }];
  if (/madurez/i.test(title)) return [{ kind: "maturity", title: "Distribución de madurez D0–D5 (fichas FUR)" }];
  if (/exportaciones/i.test(title)) return [{ kind: "audit", title: "Exportaciones registradas", type: "DASHBOARD_EXPORT" }];
  if (/movimientos recientes/i.test(title)) return [{ kind: "audit", title: "Movimientos de inventario", type: "STOCK_MOVEMENT" }];
  if (/audit log|cambios fur|historial/i.test(title)) return [{ kind: "audit", title: title }];
  if (/documento|documentaci[oó]n|evidencias/i.test(title)) return [{ kind: "docs", title: "Documentos vinculados a fichas FUR" }];
  if (/stock|repuestos cr[ií]ticos|inventario cr[ií]tico/i.test(title)) return [{ kind: "stock", title: "Ítems bajo su punto de reorden" }];
  if (/activos cr[ií]ticos/i.test(title))
    return [{ kind: "records", title: "Activos de criticidad alta", domains, preset: { criticality: "Alta" } }];
  if (/calidad del dato/i.test(title))
    return [
      { kind: "records", title: "Calidad de dato por ficha FUR", domains },
      { kind: "maturity", title: "Distribución de madurez D0–D5" },
    ];
  return null;
}

export interface ActionRule {
  test: RegExp;
  to?: string;
  /** "export" dispara la exportación CSV; "section:<id>" salta a otra sección del dashboard. */
  action?: "export" | `section:${string}`;
  reason?: string;
}

/** Acciones rápidas (§4.7): las que existen en el sistema apuntan a su pantalla real; el resto explica qué falta. */
export const ACTION_RULES: ActionRule[] = [
  { test: /exportar|export/i, action: "export" },
  { test: /abrir fur|ver fur|catálogo|catalogo/i, to: "/app/catalogo" },
  { test: /repuesto|solicitar/i, to: "/app/inventario" },
  { test: /mapa/i, to: "/app/mapas" },
  { test: /documento|adjuntar|certificado|comunicado/i, to: "/app/documentos" },
  { test: /rfq|oferta|compra|requisici/i, to: "/app/requisiciones" },
  { test: /muestra|corrida|laboratorio/i, to: "/app/laboratorio" },
  { test: /curso|inscri|certificaci/i, to: "/app/cursos" },
  { test: /presupuesto|costo/i, to: "/app/presupuestos" },
  { test: /metodolog[ií]a|ayuda|definici/i, action: "section:c-ayuda" },
  { test: /\bot\b|orden de trabajo/i, reason: "Requiere el módulo de órdenes de trabajo (Odoo Maintenance), aún no conectado." },
  { test: /reconocer|alarma|evento contextual|tendencia/i, reason: "Requiere SCADA/Historian, aún no conectado." },
];
