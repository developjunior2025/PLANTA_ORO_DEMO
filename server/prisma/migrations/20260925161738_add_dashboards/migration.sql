-- CreateTable
CREATE TABLE "Dashboard" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "roleCode" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "refresh" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "drilldown" TEXT NOT NULL,
    "sections" JSONB NOT NULL,
    "visualizations" JSONB NOT NULL,
    "sources" JSONB NOT NULL,
    "alerts" JSONB NOT NULL,
    "actions" JSONB NOT NULL,
    "version" TEXT NOT NULL DEFAULT 'REV.00',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiDefinition" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "dashboardCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT,
    "formula" TEXT,
    "owner" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT 'v0.1',
    "approvalStatus" TEXT NOT NULL DEFAULT 'Pendiente de aprobación',
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "KpiDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_code_key" ON "Dashboard"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_slug_key" ON "Dashboard"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "KpiDefinition_code_key" ON "KpiDefinition"("code");

-- CreateIndex
CREATE INDEX "KpiDefinition_dashboardCode_idx" ON "KpiDefinition"("dashboardCode");
