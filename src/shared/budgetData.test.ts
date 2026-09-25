import { describe, expect, it } from "vitest";
import {
  costoDirecto,
  precioUnitario,
  totalCapitulo,
  totalPartida,
  totalPresupuesto,
  type BudgetChapter,
  type BudgetItem,
  type BudgetProject,
} from "./budgetData";

// Datos de prueba con la misma forma que devuelve GET /api/v1/lulo/projects/:code
// (antes venían de una constante local; ahora la fuente de verdad es la API real).
const item: BudgetItem = {
  code: "PART-01.01",
  name: "Suministro e instalación de liners acero al manganeso MB-01",
  unit: "uds",
  quantity: 24,
  factor: 1.28,
  linkedFur: "FUR-MNT-A03-MB01-001",
  resources: [
    { type: "Materiales", name: "Liner acero al manganeso", unit: "und", quantity: 1, unitPrice: 3200 },
    { type: "Mano de Obra", name: "Cuadrilla mecánica (turno)", unit: "hh", quantity: 6, unitPrice: 28 },
    { type: "Equipos", name: "Grúa telescópica 20t", unit: "hh", quantity: 3, unitPrice: 85 },
    { type: "Otros", name: "EPP y consumibles de montaje", unit: "glb", quantity: 1, unitPrice: 60 },
  ],
};

const chapter1: BudgetChapter = { code: "CAP-01", name: "Reposición de Liners", items: [item] };
const project: BudgetProject = { code: "LW-PROY-001", name: "Proyecto de prueba", currency: "USD", chapters: [chapter1] };

describe("motor presupuestario tipo LuloWin", () => {
  it("calcula el costo directo como la suma de todos los recursos del APU", () => {
    // Materiales 3200 + Mano de obra 6*28=168 + Equipos 3*85=255 + Otros 60 = 3683
    expect(costoDirecto(item)).toBeCloseTo(3683);
  });

  it("aplica el factor sobre el costo directo para obtener el precio unitario", () => {
    expect(precioUnitario(item)).toBeCloseTo(costoDirecto(item) * item.factor);
  });

  it("multiplica cantidad por precio unitario para el total de la partida", () => {
    expect(totalPartida(item)).toBeCloseTo(item.quantity * precioUnitario(item));
  });

  it("suma los totales de las partidas para el total del capítulo", () => {
    const expected = chapter1.items.reduce((sum, i) => sum + totalPartida(i), 0);
    expect(totalCapitulo(chapter1)).toBeCloseTo(expected);
  });

  it("suma los totales de todos los capítulos para el presupuesto completo", () => {
    const expected = project.chapters.reduce((sum, c) => sum + totalCapitulo(c), 0);
    expect(totalPresupuesto(project)).toBeCloseTo(expected);
    expect(totalPresupuesto(project)).toBeGreaterThan(0);
  });

  it("nunca deja un recurso con cantidad o precio negativos", () => {
    for (const resource of item.resources) {
      expect(resource.quantity).toBeGreaterThan(0);
      expect(resource.unitPrice).toBeGreaterThan(0);
    }
  });
});
