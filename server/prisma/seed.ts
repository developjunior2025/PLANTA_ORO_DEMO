/**
 * Seed real hacia PostgreSQL. Importa los mismos datos de ejemplo que antes
 * vivían solo en el navegador (src/shared/*.ts del frontend) para que no haya
 * dos fuentes de verdad divergentes mientras el frontend migra a consumir
 * esta API en vez de sus arrays locales.
 */
import { PrismaClient, Prisma } from "@prisma/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  FUR_RECORDS,
  EXTRA_FUR_RECORDS,
  CATALOG_ENTITIES,
  STOCK_ITEMS,
  BUDGET_PROJECT,
  PRODUCTION_TREND_24H,
  FAILURE_PARETO,
  UPCOMING_WORK_ORDERS,
  POWER_DEMAND_24H,
  TONNAGE_LAST_7_DAYS,
  LAB_SAMPLES_BY_STATUS,
  EXTRA_SERIES,
} from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  // En la nube el seed corre en cada arranque; si ya hay datos se omite para no retrasar el despertar del servicio.
  if (process.env.SKIP_IF_SEEDED === "1" && (await prisma.dashboard.count()) > 0) {
    console.log("Base ya sembrada: se omite el seed.");
    return;
  }

  console.log("Seeding fur_records...");
  for (const r of [...FUR_RECORDS, ...EXTRA_FUR_RECORDS]) {
    await prisma.furRecord.upsert({
      where: { furCode: r.furCode },
      create: {
        furCode: r.furCode,
        uuid: r.uuid,
        domain: r.domain,
        name: r.name,
        family: r.family,
        status: r.status,
        criticality: r.criticality,
        maturity: r.maturity,
        dataQualityPercent: r.dataQualityPercent,
        zone: r.zone,
        area: r.area,
        process: r.process,
        coordinates: r.coordinates,
        manufacturer: r.manufacturer,
        model: r.model,
        serial: r.serial,
        supplier: r.supplier,
        createdAt: r.createdAt,
        version: r.version,
        image: `/placeholders/${r.domain}.svg`,
        technicalFields: r.technicalFields as unknown as Prisma.InputJsonValue,
        relations: r.relations as unknown as Prisma.InputJsonValue,
        documents: r.documents as unknown as Prisma.InputJsonValue,
        holds: r.holds as unknown as Prisma.InputJsonValue,
      },
      update: {},
    });
  }

  console.log("Seeding catalog_entities...");
  for (const e of CATALOG_ENTITIES) {
    await prisma.catalogEntity.upsert({
      where: { furCode: e.furCode },
      create: {
        furCode: e.furCode,
        entityType: e.entityType,
        domain: e.domain,
        title: e.title,
        subtitle: e.subtitle,
        meta: e.meta,
        status: e.status,
        image: `/placeholders/${e.domain ?? "GEN"}.svg`,
        price: e.price,
        rating: e.rating,
      },
      update: {},
    });
  }

  console.log("Seeding stock_items...");
  for (const s of STOCK_ITEMS) {
    await prisma.stockItem.upsert({
      where: { sku: s.sku },
      create: {
        sku: s.sku,
        name: s.name,
        category: s.category,
        warehouse: s.warehouse,
        location: s.location,
        qty: s.qty,
        uom: s.uom,
        reorderPoint: s.reorderPoint,
        linkedFur: s.linkedFur,
        lastMovement: s.lastMovement,
      },
      update: {},
    });
  }

  console.log("Seeding budget project...");
  const existingProject = await prisma.budgetProject.findUnique({ where: { code: BUDGET_PROJECT.code } });
  if (!existingProject) {
    await prisma.budgetProject.create({
      data: {
        code: BUDGET_PROJECT.code,
        name: BUDGET_PROJECT.name,
        currency: BUDGET_PROJECT.currency,
        chapters: {
          create: BUDGET_PROJECT.chapters.map((c) => ({
            code: c.code,
            name: c.name,
            items: {
              create: c.items.map((i) => ({
                code: i.code,
                name: i.name,
                unit: i.unit,
                quantity: i.quantity,
                factor: i.factor,
                linkedFur: i.linkedFur,
                resources: {
                  create: i.resources.map((r) => ({
                    type: r.type,
                    name: r.name,
                    unit: r.unit,
                    quantity: r.quantity,
                    unitPrice: r.unitPrice,
                  })),
                },
              })),
            },
          })),
        },
      },
    });
  }

  console.log("Seeding chart series...");
  const series: Record<string, unknown> = {
    production_trend_24h: PRODUCTION_TREND_24H,
    failure_pareto: FAILURE_PARETO,
    upcoming_work_orders: UPCOMING_WORK_ORDERS,
    power_demand_24h: POWER_DEMAND_24H,
    tonnage_last_7_days: TONNAGE_LAST_7_DAYS,
    lab_samples_by_status: LAB_SAMPLES_BY_STATUS,
    ...EXTRA_SERIES,
  };
  for (const [key, data] of Object.entries(series)) {
    await prisma.chartSeries.upsert({
      where: { key },
      create: { key, data: data as object },
      update: { data: data as object },
    });
  }

  // --- Dashboards (documento maestro de dashboards REV.00, §8 y §14/§15) ---
  interface DocDashboard {
    code: string; slug: string; route: string; roleCode: string; audience: string; refresh: string; domain: string;
    objective: string; drilldown: string; sections: { id: string; title: string }[]; kpis: string[];
    visualizations: string[]; sources: string[]; alerts: string[]; actions: string[];
  }
  // Fórmulas estructurales del §15; el resto queda "pendiente de aprobación" (HOLD #2 del §24).
  const FORMULAS: [RegExp, string][] = [
    [/^Disponibilidad/i, "Tiempo disponible / tiempo calendario × 100"],
    [/^Utilización/i, "Tiempo operando / tiempo disponible × 100"],
    [/^OEE/i, "Disponibilidad × rendimiento × calidad"],
    [/t\/h|throughput/i, "Masa procesada / tiempo"],
    [/^Recuperación Au/i, "Au producto / Au alimentación × 100"],
    [/energía por tonelada|Consumo específico/i, "kWh / t procesada"],
    [/MTBF/i, "Horas operativas / número de fallas"],
    [/MTTR/i, "Horas de reparación / número de reparaciones"],
    [/TAT/i, "Fecha/hora de aprobación − fecha/hora de recepción"],
    [/Madurez D4/i, "FUR D4/D5 / total FUR × 100"],
  ];
  const docs = JSON.parse(readFileSync(join(__dirname, "dashboards-doc.json"), "utf-8")) as DocDashboard[];
  for (const d of docs) {
    const data = {
      slug: d.slug, route: d.route, roleCode: d.roleCode, audience: d.audience, domain: d.domain, refresh: d.refresh,
      objective: d.objective, drilldown: d.drilldown, sections: d.sections, visualizations: d.visualizations,
      sources: d.sources, alerts: d.alerts, actions: d.actions,
    };
    await prisma.dashboard.upsert({ where: { code: d.code }, create: { code: d.code, ...data }, update: data });
    const short = d.code.split("-")[2];
    for (const [i, name] of d.kpis.entries()) {
      const unit = /\(([^)]+)\)\s*$/.exec(name)?.[1] ?? null;
      const formula = FORMULAS.find(([re]) => re.test(name))?.[1] ?? null;
      const kd = {
        dashboardCode: d.code, name, sortOrder: i, owner: d.audience, unit, formula,
        description: `Indicador gobernado del dashboard ${d.code}. Debe mostrar fuente, timestamp y calidad.`,
      };
      await prisma.kpiDefinition.upsert({
        where: { code: `KPI-${short}-${String(i + 1).padStart(2, "0")}` },
        create: { code: `KPI-${short}-${String(i + 1).padStart(2, "0")}`, ...kd },
        update: kd,
      });
    }
  }
  console.log(`Dashboards: ${docs.length}.`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
