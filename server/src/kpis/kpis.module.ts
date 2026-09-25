import { Module, Controller, Get, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { matchesFilter, type FurFilter } from "../dashboards/fur-filter";

interface Hold {
  level: string;
  description: string;
}
interface TechField {
  label: string;
  value: string;
}
interface BudgetResource {
  type: string;
  quantity: number;
  unitPrice: number;
}

/**
 * KPIs calculados de verdad sobre los datos de PostgreSQL (fórmulas conceptuales del
 * megadocumento §64.3 que sí se pueden calcular con lo que hay hoy en la base).
 * Los KPIs que dependen de SCADA/Historian, NMS, LIMS u Odoo no aparecen aquí:
 * el frontend los marca como "ejemplo" porque su fuente de autoridad aún no está conectada.
 */
@Injectable()
export class KpisService {
  constructor(private readonly prisma: PrismaService) {}

  /** Los filtros de FUR solo afectan a los KPIs derivados de fichas FUR; stock y presupuesto no tienen esas dimensiones. */
  async compute(filter?: FurFilter) {
    const [allFur, stock, budget, catalog, audit] = await Promise.all([
      this.prisma.furRecord.findMany({
        select: {
          furCode: true, name: true, domain: true, area: true, zone: true, criticality: true,
          status: true, maturity: true, dataQualityPercent: true, holds: true, technicalFields: true,
        },
      }),
      this.prisma.stockItem.findMany(),
      this.prisma.budgetProject.findFirst({ include: { chapters: { include: { items: { include: { resources: true } } } } } }),
      this.prisma.catalogEntity.findMany({ select: { entityType: true } }),
      this.prisma.auditEvent.findMany({ select: { eventType: true, createdAt: true } }),
    ]);

    const furRows = filter ? allFur.filter((r) => matchesFilter(r, filter)) : allFur;

    // --- FUR ---
    const byDomain: Record<string, number> = {};
    let tbc = 0;
    let hold = 0;
    let withHold = 0;
    let d4plus = 0;
    let qualitySum = 0;
    const byMaturity: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    for (const r of furRows) {
      byDomain[r.domain] = (byDomain[r.domain] ?? 0) + 1;
      const holds = r.holds as unknown as Hold[];
      tbc += holds.filter((h) => h.level === "TBC").length;
      const h = holds.filter((x) => x.level === "HOLD").length;
      hold += h;
      if (h > 0) withHold += 1;
      if (r.maturity === "D4" || r.maturity === "D5") d4plus += 1;
      qualitySum += r.dataQualityPercent;
      byMaturity[r.maturity] = (byMaturity[r.maturity] ?? 0) + 1;
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
    }
    const total = furRows.length || 1;

    // --- MNT: MTBF declarado en la ficha del plan de mantenimiento ---
    let mtbf: number | null = null;
    for (const r of furRows.filter((x) => x.domain === "MNT")) {
      const f = (r.technicalFields as unknown as TechField[]).find((t) => t.label.includes("MTBF"));
      if (f) mtbf = Number(f.value.replace(/,/g, ""));
    }

    // --- WMS ---
    const critical = stock.filter((s) => s.category.toLowerCase().includes("críticos"));
    const criticalBelow = critical.filter((s) => s.qty < s.reorderPoint);

    // --- Presupuesto (fórmula LuloWin: CD × factor × cantidad) ---
    let budgetTotal = 0;
    const costByType: Record<string, number> = {};
    let budgetItems = 0;
    for (const c of budget?.chapters ?? []) {
      for (const i of c.items) {
        budgetItems += 1;
        const res = i.resources as unknown as BudgetResource[];
        for (const r of res) {
          const cd = r.quantity * r.unitPrice * i.factor * i.quantity;
          costByType[r.type] = (costByType[r.type] ?? 0) + cd;
          budgetTotal += cd;
        }
      }
    }

    // --- Catálogo ---
    const cat: Record<string, number> = {};
    for (const c of catalog) cat[c.entityType] = (cat[c.entityType] ?? 0) + 1;

    // --- Auditoría ---
    const auditByType: Record<string, number> = {};
    for (const a of audit) auditByType[a.eventType] = (auditByType[a.eventType] ?? 0) + 1;

    return {
      generatedAt: new Date().toISOString(),
      fur: {
        total: furRows.length,
        byDomain,
        byMaturity,
        byStatus,
        avgQuality: Math.round(qualitySum / total),
        d4plusPct: Math.round((d4plus / total) * 100),
        tbc,
        hold,
        recordsWithHold: withHold,
      },
      mnt: { mtbf },
      stock: {
        skus: stock.length,
        belowReorder: stock.filter((s) => s.qty < s.reorderPoint).length,
        criticalTotal: critical.length,
        criticalBelow: criticalBelow.length,
        stockoutCriticalPct: critical.length ? Math.round((criticalBelow.length / critical.length) * 100) : 0,
        movements: auditByType["STOCK_MOVEMENT"] ?? 0,
      },
      budget: {
        currency: budget?.currency ?? "USD",
        total: Math.round(budgetTotal * 100) / 100,
        chapters: budget?.chapters.length ?? 0,
        items: budgetItems,
        costByType: Object.fromEntries(Object.entries(costByType).map(([k, v]) => [k, Math.round(v)])),
      },
      procurement: {
        rqTotal: byDomain["RQ"] ?? 0,
        rqOpen: furRows.filter((r) => r.domain === "RQ" && r.status !== "Operativo").length,
        offers: byDomain["OF"] ?? 0,
      },
      catalog: {
        providers: cat["Proveedor"] ?? 0,
        courses: cat["Curso (LMS)"] ?? 0,
        professionals: cat["Personas"] ?? 0,
        services: cat["Servicio"] ?? 0,
        documents: cat["Documento"] ?? 0,
        total: catalog.length,
      },
      audit: { total: audit.length, byType: auditByType },
    };
  }
}

@Controller("api/v1/kpis")
class KpisController {
  constructor(private readonly kpis: KpisService) {}

  @Get()
  all() {
    return this.kpis.compute();
  }
}

@Module({
  controllers: [KpisController],
  providers: [PrismaService, KpisService],
  exports: [KpisService],
})
export class KpisModule {}
