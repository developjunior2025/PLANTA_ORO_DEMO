import { Module } from "@nestjs/common";
import { FurController } from "./fur.controller";
import { FurService } from "./fur.service";
import { PrismaService } from "../prisma.service";
import { AuditModule } from "../audit/audit.module";

@Module({
  imports: [AuditModule],
  controllers: [FurController],
  providers: [FurService, PrismaService],
})
export class FurModule {}
