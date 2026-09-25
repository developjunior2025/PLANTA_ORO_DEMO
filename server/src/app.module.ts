import { Module, Controller, Get } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FurModule } from "./fur/fur.module";
import { CatalogModule } from "./catalog/catalog.module";
import { InventoryModule } from "./inventory/inventory.module";
import { BudgetModule } from "./budget/budget.module";
import { DocumentsModule } from "./documents/documents.module";
import { ChartsModule } from "./charts/charts.module";
import { KpisModule } from "./kpis/kpis.module";
import { DashboardsModule } from "./dashboards/dashboards.module";

@Controller("api/v1/health")
class HealthController {
  @Get()
  check() {
    return { status: "ok", service: "oro-planta-api" };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FurModule,
    CatalogModule,
    InventoryModule,
    BudgetModule,
    DocumentsModule,
    ChartsModule,
    KpisModule,
    DashboardsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
