import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { FurService } from "./fur.service";
import { CreateFurDto, UpdateFurDto } from "./dto";

@Controller("api/v1/fur")
export class FurController {
  constructor(private readonly furService: FurService) {}

  @Get()
  list(@Query("domain") domain?: string) {
    const domains = domain ? domain.split(",").map((d) => d.trim().toUpperCase()) : undefined;
    return this.furService.findList(domains);
  }

  @Post()
  create(@Body() dto: CreateFurDto) {
    return this.furService.create(dto);
  }

  @Get(":furCode")
  async detail(@Param("furCode") furCode: string) {
    const record = await this.furService.findByCode(furCode);
    if (!record) {
      throw new NotFoundException(`FUR ${furCode} no encontrado`);
    }
    return record;
  }

  @Patch(":furCode")
  update(@Param("furCode") furCode: string, @Body() dto: UpdateFurDto) {
    return this.furService.update(furCode, dto);
  }

  @Get(":furCode/relations")
  relations(@Param("furCode") furCode: string) {
    return this.furService.findRelations(furCode);
  }
}
