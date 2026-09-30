import { Body, ConflictException, Controller, Delete, Get, Module, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateCatalogEntityDto, UpdateCatalogEntityDto } from "./dto";
import { AuditModule, AuditService } from "../audit/audit.module";

@Controller("api/v1/catalog")
class CatalogController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService
  ) {}

  @Get()
  list() {
    return this.prisma.catalogEntity.findMany({ orderBy: { title: "asc" } });
  }

  @Get(":furCode")
  async detail(@Param("furCode") furCode: string) {
    const entity = await this.prisma.catalogEntity.findUnique({ where: { furCode } });
    if (!entity) {
      throw new NotFoundException(`Entidad ${furCode} no encontrada`);
    }
    return entity;
  }

  @Post()
  async create(@Body() dto: CreateCatalogEntityDto) {
    const furCode = dto.furCode.trim().toUpperCase();
    const existing = await this.prisma.catalogEntity.findUnique({ where: { furCode } });
    if (existing) throw new ConflictException(`Ya existe una entidad con código ${furCode}`);
    const entity = await this.prisma.catalogEntity.create({
      data: {
        furCode,
        entityType: dto.entityType,
        domain: dto.domain,
        plantCode: dto.plantCode,
        zone: dto.zone,
        title: dto.title,
        subtitle: dto.subtitle,
        meta: dto.meta,
        status: dto.status,
        // Sin subida de archivos todavía (AS-BUILT pendiente): imagen placeholder real por red.
        image: `/placeholders/${dto.domain ?? "GEN"}.svg`,
        price: dto.price,
        rating: dto.rating,
      },
    });
    await this.audit.log(furCode, "CATALOG_ENTITY_CREATED", `Entidad creada: ${dto.title} (${dto.entityType})`);
    return entity;
  }

  @Patch(":furCode")
  async update(@Param("furCode") furCode: string, @Body() dto: UpdateCatalogEntityDto) {
    const existing = await this.prisma.catalogEntity.findUnique({ where: { furCode } });
    if (!existing) throw new NotFoundException(`Entidad ${furCode} no encontrada`);
    const domain = dto.domain !== undefined ? dto.domain : existing.domain;
    const entity = await this.prisma.catalogEntity.update({
      where: { furCode },
      data: {
        ...dto,
        // Si cambia la red, el placeholder de imagen se actualiza con ella.
        image: dto.domain !== undefined ? `/placeholders/${domain ?? "GEN"}.svg` : undefined,
      },
    });
    await this.audit.log(furCode, "CATALOG_ENTITY_UPDATED", `Entidad actualizada: ${existing.title}`);
    return entity;
  }

  @Delete(":furCode")
  async remove(@Param("furCode") furCode: string) {
    const existing = await this.prisma.catalogEntity.findUnique({ where: { furCode } });
    if (!existing) throw new NotFoundException(`Entidad ${furCode} no encontrada`);
    await this.prisma.catalogEntity.delete({ where: { furCode } });
    await this.audit.log(furCode, "CATALOG_ENTITY_DELETED", `Entidad eliminada: ${existing.title}`);
    return { deleted: true };
  }
}

@Module({
  imports: [AuditModule],
  controllers: [CatalogController],
  providers: [PrismaService],
})
export class CatalogModule {}
