-- CreateTable
CREATE TABLE "FurRecord" (
    "id" TEXT NOT NULL,
    "furCode" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "criticality" TEXT NOT NULL,
    "maturity" TEXT NOT NULL,
    "dataQualityPercent" INTEGER NOT NULL,
    "zone" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "process" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "technicalFields" JSONB NOT NULL,
    "relations" JSONB NOT NULL,
    "documents" JSONB NOT NULL,
    "holds" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FurRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogEntity" (
    "id" TEXT NOT NULL,
    "furCode" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "domain" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "meta" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "CatalogEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockItem" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "warehouse" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "qty" DOUBLE PRECISION NOT NULL,
    "uom" TEXT NOT NULL,
    "reorderPoint" DOUBLE PRECISION NOT NULL,
    "linkedFur" TEXT,
    "lastMovement" TEXT NOT NULL,

    CONSTRAINT "StockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetProject" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "BudgetProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetChapter" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "BudgetChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetItem" (
    "code" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "linkedFur" TEXT,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetResource" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "BudgetResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartSeries" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ChartSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FurRecord_furCode_key" ON "FurRecord"("furCode");

-- CreateIndex
CREATE UNIQUE INDEX "FurRecord_uuid_key" ON "FurRecord"("uuid");

-- CreateIndex
CREATE INDEX "FurRecord_domain_idx" ON "FurRecord"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogEntity_furCode_key" ON "CatalogEntity"("furCode");

-- CreateIndex
CREATE INDEX "CatalogEntity_entityType_idx" ON "CatalogEntity"("entityType");

-- CreateIndex
CREATE UNIQUE INDEX "StockItem_sku_key" ON "StockItem"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "BudgetProject_code_key" ON "BudgetProject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ChartSeries_key_key" ON "ChartSeries"("key");

-- AddForeignKey
ALTER TABLE "BudgetChapter" ADD CONSTRAINT "BudgetChapter_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "BudgetProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "BudgetChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetResource" ADD CONSTRAINT "BudgetResource_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "BudgetItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
