import { Body, ConflictException, Controller, Delete, Get, Module, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";
import { PrismaService } from "../prisma.service";
import { AuditModule, AuditService } from "../audit/audit.module";

class CreatePlantDto {
  @IsString() @MinLength(2) code!: string;
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(2) location!: string;
}

class UpdatePlantDto {
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(2) location!: string;
}

@Controller("api/v1/plants")
class PlantsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService
  ) {}

  /** Incluye cuántas fichas FUR y entidades de catálogo tiene cada planta (real, no decorativo). */
  @Get()
  async list() {
    const [plants, furCounts, catalogCounts] = await Promise.all([
      this.prisma.plant.findMany({ orderBy: { code: "asc" } }),
      this.prisma.furRecord.groupBy({ by: ["plantCode"], _count: { _all: true } }),
      this.prisma.catalogEntity.groupBy({ by: ["plantCode"], _count: { _all: true } }),
    ]);
    const furMap = new Map(furCounts.map((c) => [c.plantCode, c._count._all]));
    const catMap = new Map(catalogCounts.filter((c) => c.plantCode).map((c) => [c.plantCode as string, c._count._all]));
    return plants.map((p) => ({
      ...p,
      furCount: furMap.get(p.code) ?? 0,
      catalogCount: catMap.get(p.code) ?? 0,
    }));
  }

  @Post()
  async create(@Body() dto: CreatePlantDto) {
    const code = dto.code.trim().toUpperCase();
    const existing = await this.prisma.plant.findUnique({ where: { code } });
    if (existing) throw new ConflictException(`Ya existe una planta con código ${code}`);
    const plant = await this.prisma.plant.create({ data: { code, name: dto.name, location: dto.location } });
    await this.audit.log(code, "PLANT_CREATED", `Planta creada: ${dto.name} (${dto.location})`);
    return plant;
  }

  @Patch(":code")
  async update(@Param("code") code: string, @Body() dto: UpdatePlantDto) {
    const existing = await this.prisma.plant.findUnique({ where: { code } });
    if (!existing) throw new NotFoundException(`Planta ${code} no encontrada`);
    const plant = await this.prisma.plant.update({ where: { code }, data: { name: dto.name, location: dto.location } });
    await this.audit.log(code, "PLANT_UPDATED", `Planta actualizada: ${existing.name} → ${dto.name}, ${existing.location} → ${dto.location}`);
    return plant;
  }

  /** Se rechaza si la planta todavía tiene fichas FUR o entidades de catálogo — nunca se borran datos huérfanos en silencio. */
  @Delete(":code")
  async remove(@Param("code") code: string) {
    const existing = await this.prisma.plant.findUnique({ where: { code } });
    if (!existing) throw new NotFoundException(`Planta ${code} no encontrada`);
    const [furCount, catalogCount] = await Promise.all([
      this.prisma.furRecord.count({ where: { plantCode: code } }),
      this.prisma.catalogEntity.count({ where: { plantCode: code } }),
    ]);
    if (furCount > 0 || catalogCount > 0) {
      throw new ConflictException(
        `No se puede eliminar ${code}: tiene ${furCount} fichas FUR y ${catalogCount} entidades de catálogo registradas`
      );
    }
    await this.prisma.plant.delete({ where: { code } });
    await this.audit.log(code, "PLANT_DELETED", `Planta eliminada: ${existing.name}`);
    return { deleted: true };
  }
}

@Module({
  imports: [AuditModule],
  controllers: [PlantsController],
  providers: [PrismaService],
})
export class PlantsModule {}
