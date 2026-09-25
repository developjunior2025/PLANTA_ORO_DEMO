import { Module, Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("api/v1/lulo/projects")
class BudgetController {
  constructor(private readonly prisma: PrismaService) {}

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
}

@Module({
  controllers: [BudgetController],
  providers: [PrismaService],
})
export class BudgetModule {}
