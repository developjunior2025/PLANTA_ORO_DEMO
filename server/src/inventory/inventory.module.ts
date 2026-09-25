import { Module, Controller, Get, Patch, Param, Body, NotFoundException, BadRequestException } from "@nestjs/common";
import { IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { PrismaService } from "../prisma.service";
import { AuditModule, AuditService } from "../audit/audit.module";

class StockMovementDto {
  @IsNumber()
  delta!: number;

  @IsIn(["Entrada", "Salida", "Ajuste"])
  reason!: "Entrada" | "Salida" | "Ajuste";

  @IsOptional()
  @IsString()
  note?: string;
}

@Controller("api/v1/inventory")
class InventoryController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService
  ) {}

  @Get()
  list() {
    return this.prisma.stockItem.findMany({ orderBy: { sku: "asc" } });
  }

  @Patch(":sku/movement")
  async registerMovement(@Param("sku") sku: string, @Body() dto: StockMovementDto) {
    const item = await this.prisma.stockItem.findUnique({ where: { sku } });
    if (!item) {
      throw new NotFoundException(`SKU ${sku} no encontrado`);
    }
    const newQty = item.qty + dto.delta;
    if (newQty < 0) {
      throw new BadRequestException(`Movimiento dejaría stock negativo (${item.qty} + ${dto.delta})`);
    }

    const updated = await this.prisma.stockItem.update({
      where: { sku },
      data: { qty: newQty, lastMovement: new Date().toISOString().slice(0, 10) },
    });

    await this.audit.log(
      sku,
      "STOCK_MOVEMENT",
      `${dto.reason}: ${dto.delta > 0 ? "+" : ""}${dto.delta} ${item.uom} (${item.qty} → ${newQty})${dto.note ? " — " + dto.note : ""}`
    );

    return updated;
  }
}

@Module({
  imports: [AuditModule],
  controllers: [InventoryController],
  providers: [PrismaService],
})
export class InventoryModule {}
