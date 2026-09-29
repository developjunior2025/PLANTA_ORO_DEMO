import { Controller, Get, Module } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("api/v1/plants")
class PlantsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.plant.findMany({ orderBy: { code: "asc" } });
  }
}

@Module({
  controllers: [PlantsController],
  providers: [PrismaService],
})
export class PlantsModule {}
