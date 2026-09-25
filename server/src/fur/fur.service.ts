import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { AuditService } from "../audit/audit.module";
import type { CreateFurDto, UpdateFurDto } from "./dto";

@Injectable()
export class FurService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService
  ) {}

  findByCode(furCode: string) {
    return this.prisma.furRecord.findUnique({ where: { furCode } });
  }

  findList(domains?: string[]) {
    return this.prisma.furRecord.findMany({
      where: domains && domains.length > 0 ? { domain: { in: domains } } : undefined,
      orderBy: { furCode: "asc" },
    });
  }

  async findRelations(furCode: string) {
    const record = await this.prisma.furRecord.findUnique({ where: { furCode } });
    return record?.relations ?? [];
  }

  async create(dto: CreateFurDto) {
    const existing = await this.prisma.furRecord.findUnique({ where: { furCode: dto.furCode } });
    if (existing) {
      throw new ConflictException(`Ya existe una ficha con código ${dto.furCode}`);
    }

    const record = await this.prisma.furRecord.create({
      data: {
        furCode: dto.furCode,
        uuid: randomUUID(),
        domain: dto.domain,
        name: dto.name,
        family: dto.family,
        status: dto.status ?? "En proyecto",
        criticality: dto.criticality ?? "Media",
        maturity: dto.maturity ?? "D1",
        dataQualityPercent: 20,
        zone: dto.zone,
        area: dto.area,
        process: dto.process,
        coordinates: "",
        manufacturer: dto.manufacturer ?? "—",
        model: dto.model ?? "—",
        serial: "—",
        supplier: dto.supplier ?? "—",
        createdAt: new Date().toISOString().slice(0, 10),
        version: "1.0",
        image: `/placeholders/${dto.domain}.svg`,
        technicalFields: [],
        relations: [],
        documents: [],
        holds: [{ level: "TBC", description: "Ficha recién creada — pendiente de completar bloque técnico" }],
      },
    });

    await this.audit.log(record.furCode, "FUR_CREATED", `Ficha creada como ${record.status}, dominio ${record.domain}`);
    return record;
  }

  async update(furCode: string, dto: UpdateFurDto) {
    const existing = await this.prisma.furRecord.findUnique({ where: { furCode } });
    if (!existing) {
      throw new NotFoundException(`FUR ${furCode} no encontrado`);
    }

    const record = await this.prisma.furRecord.update({
      where: { furCode },
      data: {
        status: dto.status,
        criticality: dto.criticality,
        maturity: dto.maturity,
        dataQualityPercent: dto.dataQualityPercent,
        holds: dto.holds as unknown as Prisma.InputJsonValue,
      },
    });

    if (dto.status && dto.status !== existing.status) {
      await this.audit.log(furCode, "STATUS_CHANGED", `Estado: ${existing.status} → ${dto.status}`);
    }
    if (dto.criticality && dto.criticality !== existing.criticality) {
      await this.audit.log(furCode, "FUR_UPDATED", `Criticidad: ${existing.criticality} → ${dto.criticality}`);
    }
    if (dto.maturity && dto.maturity !== existing.maturity) {
      await this.audit.log(furCode, "DATA_QUALITY_CHANGED", `Madurez: ${existing.maturity} → ${dto.maturity}`);
    }
    if (dto.holds) {
      const before = (existing.holds as unknown as { description: string }[]).length;
      const after = dto.holds.length;
      if (after !== before) {
        await this.audit.log(
          furCode,
          after > before ? "HOLD_CREATED" : "HOLD_CLOSED",
          `Pendientes TBC/HOLD: ${before} → ${after}`
        );
      }
    }

    return record;
  }
}
