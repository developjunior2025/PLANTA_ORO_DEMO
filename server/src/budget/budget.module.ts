import { Body, ConflictException, Controller, Delete, Get, Module, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { IsString, MinLength } from "class-validator";
import { PrismaService } from "../prisma.service";
import { AuditModule, AuditService } from "../audit/audit.module";

class CreateBudgetProjectDto {
  @IsString() @MinLength(2) code!: string;
  @IsString() @MinLength(2) plantCode!: string;
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(1) currency!: string;
}

@Controller("api/v1/lulo/projects")
class BudgetController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService
  ) {}

  /** Lista liviana (sin capítulos/partidas) para el Panel Planta; filtra por planta si se pide. */
  @Get()
  list(@Query("plantCode") plantCode?: string) {
    return this.prisma.budgetProject.findMany({
      where: plantCode ? { plantCode } : undefined,
      orderBy: { code: "asc" },
    });
  }

  @Get(":code")
  async getProject(@Param("code") code: string) {
    const project = await this.prisma.budgetProject.findUnique({
      where: { code },
      include: {
        chapters: {
          include: { items: { include: { resources: true } } },
        },
      },
    });
    if (!project) {
      throw new NotFoundException(`Proyecto de presupuesto ${code} no encontrado`);
    }
    return project;
  }

  @Post()
  async create(@Body() dto: CreateBudgetProjectDto) {
    const code = dto.code.trim().toUpperCase();
    const existing = await this.prisma.budgetProject.findUnique({ where: { code } });
    if (existing) throw new ConflictException(`Ya existe un proyecto de presupuesto con código ${code}`);
    const project = await this.prisma.budgetProject.create({
      data: { code, plantCode: dto.plantCode, name: dto.name, currency: dto.currency },
    });
    await this.audit.log(code, "BUDGET_PROJECT_CREATED", `Proyecto de presupuesto creado: ${dto.name}`);
    return project;
  }

  /** Borra el proyecto y, en cascada, sus capítulos/partidas/recursos (definido en el esquema). */
  @Delete(":code")
  async remove(@Param("code") code: string) {
    const existing = await this.prisma.budgetProject.findUnique({ where: { code } });
    if (!existing) throw new NotFoundException(`Proyecto de presupuesto ${code} no encontrado`);
    await this.prisma.budgetProject.delete({ where: { code } });
    await this.audit.log(code, "BUDGET_PROJECT_DELETED", `Proyecto de presupuesto eliminado: ${existing.name}`);
    return { deleted: true };
  }
}

@Module({
  imports: [AuditModule],
  controllers: [BudgetController],
  providers: [PrismaService],
})
export class BudgetModule {}
