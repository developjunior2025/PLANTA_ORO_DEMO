import {
  Module,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
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

class CreateStockItemDto {
  @IsString() @MinLength(2) sku!: string;
  @IsString() @MinLength(2) plantCode!: string;
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(2) category!: string;
  @IsString() @MinLength(2) warehouse!: string;
  @IsString() @MinLength(2) location!: string;
  @IsNumber() qty!: number;
  @IsString() uom!: string;
  @IsNumber() reorderPoint!: number;
  @IsOptional() @IsString() linkedFur?: string;
}

class UpdateStockItemDto {
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsString() @MinLength(2) category?: string;
  @IsOptional() @IsString() @MinLength(2) warehouse?: string;
  @IsOptional() @IsString() @MinLength(2) location?: string;
  @IsOptional() @IsString() uom?: string;
  @IsOptional() @IsNumber() reorderPoint?: number;
  @IsOptional() @IsString() linkedFur?: string;
}

@Controller("api/v1/inventory")
class InventoryController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService
  ) {}

  @Get()
  list(@Query("plantCode") plantCode?: string) {
    return this.prisma.stockItem.findMany({
      where: plantCode ? { plantCode } : undefined,
      orderBy: { sku: "asc" },
    });
  }

  @Post()
  async create(@Body() dto: CreateStockItemDto) {
    const sku = dto.sku.trim().toUpperCase();
    const existing = await this.prisma.stockItem.findUnique({ where: { sku } });
    if (existing) throw new ConflictException(`Ya existe un ítem con SKU ${sku}`);
    const item = await this.prisma.stockItem.create({
      data: {
        sku,
        plantCode: dto.plantCode,
        name: dto.name,
        category: dto.category,
        warehouse: dto.warehouse,
        location: dto.location,
        qty: dto.qty,
        uom: dto.uom,
        reorderPoint: dto.reorderPoint,
        linkedFur: dto.linkedFur,
        lastMovement: new Date().toISOString().slice(0, 10),
      },
    });
    await this.audit.log(sku, "STOCK_ITEM_CREATED", `Ítem creado: ${dto.name} (${dto.qty} ${dto.uom})`);
    return item;
  }

  @Patch(":sku")
  async update(@Param("sku") sku: string, @Body() dto: UpdateStockItemDto) {
    const existing = await this.prisma.stockItem.findUnique({ where: { sku } });
    if (!existing) throw new NotFoundException(`SKU ${sku} no encontrado`);
    const item = await this.prisma.stockItem.update({ where: { sku }, data: dto });
    await this.audit.log(sku, "STOCK_ITEM_UPDATED", `Ítem actualizado: ${existing.name}`);
    return item;
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

  @Delete(":sku")
  async remove(@Param("sku") sku: string) {
    const existing = await this.prisma.stockItem.findUnique({ where: { sku } });
    if (!existing) throw new NotFoundException(`SKU ${sku} no encontrado`);
    await this.prisma.stockItem.delete({ where: { sku } });
    await this.audit.log(sku, "STOCK_ITEM_DELETED", `Ítem eliminado: ${existing.name}`);
    return { deleted: true };
  }
}

@Module({
  imports: [AuditModule],
  controllers: [InventoryController],
  providers: [PrismaService],
})
export class InventoryModule {}
