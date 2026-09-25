/**
 * Motor presupuestario tipo LuloWin (Etapa 14 / sección 10 del plan).
 * Jerarquía: Proyecto -> Presupuesto -> Capítulo -> Partida -> APU -> Recursos.
 * Fórmula documentada:
 *   CD_i  = Σ(Materiales) + Σ(Mano de obra) + Σ(Equipos) + Σ(Otros)
 *   PU_i  = CD_i × factores_aplicables
 *   TOTAL_i = Cantidad_i × PU_i
 *   PRESUPUESTO = Σ(TOTAL_i)
 * Los nombres `lw_*` son convenciones lógicas de la tesis/arquitectura, no
 * tablas físicas reales de LuloWin (HOLD hasta inspeccionar la instalación real).
 *
 * Los datos del proyecto viven ahora en PostgreSQL (server/) y se obtienen vía
 * fetchBudgetProject() en shared/api.ts. Este módulo solo conserva los tipos
 * y las funciones puras de cálculo, reutilizables sobre lo que devuelva la API.
 */
export type ApuResourceType = "Materiales" | "Mano de Obra" | "Equipos" | "Otros";

export interface ApuResource {
  type: ApuResourceType;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
}

export interface BudgetItem {
  code: string;
  name: string;
  unit: string;
  quantity: number;
  /** Factor aplicable sobre el costo directo (administración, imprevistos, utilidad, etc.) */
  factor: number;
  linkedFur?: string;
  resources: ApuResource[];
}

export interface BudgetChapter {
  code: string;
  name: string;
  items: BudgetItem[];
}

export interface BudgetProject {
  code: string;
  name: string;
  currency: string;
  chapters: BudgetChapter[];
}

export function costoDirecto(item: BudgetItem): number {
  return item.resources.reduce((sum, r) => sum + r.quantity * r.unitPrice, 0);
}

export function precioUnitario(item: BudgetItem): number {
  return costoDirecto(item) * item.factor;
}

export function totalPartida(item: BudgetItem): number {
  return item.quantity * precioUnitario(item);
}

export function totalCapitulo(chapter: BudgetChapter): number {
  return chapter.items.reduce((sum, i) => sum + totalPartida(i), 0);
}

export function totalPresupuesto(project: BudgetProject): number {
  return project.chapters.reduce((sum, c) => sum + totalCapitulo(c), 0);
}
