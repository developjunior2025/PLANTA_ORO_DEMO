import { Module, Controller, Get, Injectable, Param, Query } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import type { Prisma } from "@prisma/client";

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  log(subjectCode: string, eventType: string, description: string) {
    return this.prisma.auditEvent.create({ data: { subjectCode, eventType, description } });
  }

  recent(limit: number) {
    return this.prisma.auditEvent.findMany({ orderBy: { createdAt: "desc" }, take: limit });
  }

  forSubject(subjectCode: string) {
    return this.prisma.auditEvent.findMany({
      where: { subjectCode },
      orderBy: { createdAt: "desc" },
    });
  }

  /** Feed consolidado del panel de Administración: por tipo, rango de fechas y búsqueda de sujeto/descripción. */
  async search(q: { type?: string; from?: string; to?: string; q?: string; limit?: string }) {
    const from = q.from ? new Date(q.from) : undefined;
    const to = q.to ? new Date(`${q.to}T23:59:59.999Z`) : undefined;
    const where: Prisma.AuditEventWhereInput = {
      ...(q.type ? { eventType: q.type } : {}),
      ...(from || to ? { createdAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {}),
      ...(q.q
        ? {
            OR: [
              { subjectCode: { contains: q.q, mode: "insensitive" } },
              { description: { contains: q.q, mode: "insensitive" } },
            ],
          }
        : {}),
    };
    const [rows, types] = await Promise.all([
      this.prisma.auditEvent.findMany({ where, orderBy: { createdAt: "desc" }, take: Math.min(Number(q.limit) || 50, 200) }),
      this.prisma.auditEvent.findMany({ distinct: ["eventType"], select: { eventType: true } }),
    ]);
    return { rows, eventTypes: types.map((t) => t.eventType).sort() };
  }
}

@Controller("api/v1/fur")
class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get(":furCode/audit")
  list(@Param("furCode") furCode: string) {
    return this.audit.forSubject(furCode);
  }
}

@Controller("api/v1/audit")
class AuditFeedController {
  constructor(private readonly audit: AuditService) {}

  @Get()
  feed(@Query("limit") limit?: string) {
    return this.audit.recent(Math.min(Number(limit) || 10, 50));
  }

  @Get("search")
  search(@Query() q: { type?: string; from?: string; to?: string; q?: string; limit?: string }) {
    return this.audit.search(q);
  }
}

@Module({
  controllers: [AuditController, AuditFeedController],
  providers: [AuditService, PrismaService],
  exports: [AuditService],
})
export class AuditModule {}
