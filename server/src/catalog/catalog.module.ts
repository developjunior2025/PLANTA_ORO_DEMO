import { Module, Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Controller("api/v1/catalog")
class CatalogController {
  constructor(private readonly prisma: PrismaService) {}

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
}

@Module({
  controllers: [CatalogController],
  providers: [PrismaService],
})
export class CatalogModule {}
