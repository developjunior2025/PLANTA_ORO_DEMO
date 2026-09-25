import { Module, Controller, Get, Injectable, Param, Query } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

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
}

@Module({
  controllers: [AuditController, AuditFeedController],
  providers: [AuditService, PrismaService],
  exports: [AuditService],
})
export class AuditModule {}
