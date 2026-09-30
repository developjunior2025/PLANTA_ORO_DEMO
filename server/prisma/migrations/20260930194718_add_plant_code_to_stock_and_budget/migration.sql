-- AlterTable: agrega plantCode como nullable primero para poder rellenar filas existentes.
ALTER TABLE "BudgetProject" ADD COLUMN     "plantCode" TEXT;
ALTER TABLE "StockItem" ADD COLUMN     "plantCode" TEXT;

-- Backfill: los datos existentes (previos a este cambio) no estaban ligados a ninguna planta;
-- se asignan a PB01, la planta principal del ecosistema sembrado.
UPDATE "BudgetProject" SET "plantCode" = 'PB01' WHERE "plantCode" IS NULL;
UPDATE "StockItem" SET "plantCode" = 'PB01' WHERE "plantCode" IS NULL;

-- AlterTable: ahora sí, columna requerida.
ALTER TABLE "BudgetProject" ALTER COLUMN "plantCode" SET NOT NULL;
ALTER TABLE "StockItem" ALTER COLUMN "plantCode" SET NOT NULL;

-- CreateIndex
CREATE INDEX "BudgetProject_plantCode_idx" ON "BudgetProject"("plantCode");

-- CreateIndex
CREATE INDEX "StockItem_plantCode_idx" ON "StockItem"("plantCode");
