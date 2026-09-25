import { Body, Controller, Get, Injectable, Module, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";
import { PrismaService } from "../prisma.service";
import { AuditModule, AuditService } from "../audit/audit.module";
import { KpisModule, KpisService } from "../kpis/kpis.module";
import { activeFilters, conditionOf, matchesFilter, parseFurFilter } from "./fur-filter";

class ExportLogDto {
  @IsIn(["csv"]) format!: string;
  @IsString() @MaxLength(120) scope!: string;
  @IsOptional() @IsString() @MaxLength(300) filters?: string;
  @IsOptional() @IsString() @MaxLength(80) actor?: string;
}

const MATURITY_ORDER = ["D0", "D1", "D2", "D3", "D4", "D5"];

@Injectable()
class DashboardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kpis: KpisService,
    private readonly audit: AuditService
  ) {}

  private async find(key: string) {
    const d = await this.prisma.dashboard.findFirst({ where: { OR: [{ slug: key }, { code: key }] } });
    if (!d) throw new NotFoundException(`Dashboard ${key} no existe`);
    return d;
  }

  list() {
    return this.prisma.dashboard.findMany({
      orderBy: { code: "asc" },
      select: { code: true, slug: true, route: true, roleCode: true, audience: true, refresh: true, domain: true },
    });
  }

  async one(key: string) {
    const d = await this.find(key);
    const kpiDefinitions = await this.prisma.kpiDefinition.findMany({
      where: { dashboardCode: d.code },
      orderBy: { sortOrder: "asc" },
    });
    return { ...d, kpiDefinitions };
  }

  /** Envelope de datos del dashboard (§11.1) + KPIs reales calculados con los filtros activos. */
  async kpiEnvelope(key: string, query: Record<string, string | undefined>) {
    const d = await this.find(key);
    const filter = parseFurFilter(query);
    const data = await this.kpis.compute(filter);
    const maturities = Object.keys(data.fur.byMaturity).sort((a, b) => MATURITY_ORDER.indexOf(a) - MATURITY_ORDER.indexOf(b));
    return {
      dashboard_code: d.code,
      generated_at: data.generatedAt,
      source_timestamp: data.generatedAt,
      filters: activeFilters(filter),
      data_quality: {
        condition: data.fur.total === 0 ? "NoData" : data.fur.hold > 0 ? "HOLD" : data.fur.tbc > 0 ? "TBC" : "Referential",
        maturity: maturities[0] ?? null,
      },
      ...data,
    };
  }

  async events(key: string, q: { from?: string; to?: string; limit?: string; type?: string }) {
    await this.find(key);
    const from = q.from ? new Date(q.from) : undefined;
    const to = q.to ? new Date(`${q.to}T23:59:59.999Z`) : undefined;
    return this.prisma.auditEvent.findMany({
      where: {
        ...(from || to ? { createdAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {}),
        ...(q.type ? { eventType: q.type } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: Math.min(Number(q.limit) || 20, 100),
    });
  }

  async table(key: string, query: Record<string, string | undefined>) {
    await this.find(key);
    const filter = parseFurFilter(query);
    const rows = await this.prisma.furRecord.findMany({ orderBy: { furCode: "asc" } });
    return rows
      .filter((r) => matchesFilter(r, filter))
      .map((r) => ({
        furCode: r.furCode, name: r.name, domain: r.domain, area: r.area, zone: r.zone, status: r.status,
        criticality: r.criticality, maturity: r.maturity, dataQualityPercent: r.dataQualityPercent,
        holds: r.holds, condition: conditionOf(r),
      }));
  }

  async filterOptions() {
    const rows = await this.prisma.furRecord.findMany({
      select: { domain: true, area: true, zone: true, criticality: true, status: true, maturity: true },
    });
    const uniq = (f: (r: (typeof rows)[number]) => string) => [...new Set(rows.map(f))].sort();
    return {
      domain: uniq((r) => r.domain),
      area: uniq((r) => r.area),
      stage: uniq((r) => r.zone),
      criticality: uniq((r) => r.criticality),
      status: uniq((r) => r.status),
      maturity: uniq((r) => r.maturity),
      condition: ["Confirmado", "Referencial", "TBC", "HOLD"],
      // Sin dimensión cargada en los datos (megadocumento de dashboards §24, HOLD #13).
      unsupported: ["planta (solo existe PB01)", "turno", "proveedor"],
    };
  }

  async logExport(key: string, dto: ExportLogDto) {
    const d = await this.find(key);
    const ev = await this.audit.log(
      d.code,
      "DASHBOARD_EXPORT",
      `Exportación ${dto.format.toUpperCase()} de «${dto.scope}» (filtros: ${dto.filters || "ninguno"})${dto.actor ? ` por ${dto.actor}` : ""}`
    );
    return { id: ev.id };
  }
}

@Controller("api/v1/dashboards")
class DashboardsController {
  constructor(private readonly svc: DashboardsService) {}

  @Get() list() {
    return this.svc.list();
  }
  // Rutas estáticas antes de ":key".
  @Get("filter-options") options() {
    return this.svc.filterOptions();
  }
  @Get(":key") one(@Param("key") key: string) {
    return this.svc.one(key);
  }
  @Get(":key/kpis") kpis(@Param("key") key: string, @Query() q: Record<string, string>) {
    return this.svc.kpiEnvelope(key, q);
  }
  @Get(":key/events") events(@Param("key") key: string, @Query() q: { from?: string; to?: string; limit?: string; type?: string }) {
    return this.svc.events(key, q);
  }
  @Get(":key/table") table(@Param("key") key: string, @Query() q: Record<string, string>) {
    return this.svc.table(key, q);
  }
  @Post(":key/export-log") exportLog(@Param("key") key: string, @Body() dto: ExportLogDto) {
    return this.svc.logExport(key, dto);
  }
}

@Module({
  imports: [AuditModule, KpisModule],
  controllers: [DashboardsController],
  providers: [DashboardsService, PrismaService],
})
export class DashboardsModule {}
