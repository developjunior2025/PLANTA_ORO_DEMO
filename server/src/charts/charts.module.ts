import { Module, Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("api/v1/charts")
class ChartsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(":key")
  async getSeries(@Param("key") key: string) {
    const series = await this.prisma.chartSeries.findUnique({ where: { key } });
    if (!series) {
      throw new NotFoundException(`Serie ${key} no encontrada`);
    }
    return series.data;
  }
}

@Module({
  controllers: [ChartsController],
  providers: [PrismaService],
})
export class ChartsModule {}
