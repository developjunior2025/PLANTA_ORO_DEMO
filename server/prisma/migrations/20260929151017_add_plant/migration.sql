/*
  Warnings:

  - Added the required column `plantCode` to the `FurRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CatalogEntity" ADD COLUMN     "plantCode" TEXT;

-- AlterTable
-- Las fichas existentes son todas de PB01 en la vida real (proyecto de una sola planta hasta ahora);
-- se agrega con ese valor por defecto para no romper filas ya sembradas, y se quita el default después
-- para que quede igual al esquema (plantCode sin default: siempre lo trae el seed o el CRUD).
ALTER TABLE "FurRecord" ADD COLUMN     "plantCode" TEXT NOT NULL DEFAULT 'PB01';
ALTER TABLE "FurRecord" ALTER COLUMN "plantCode" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_code_key" ON "Plant"("code");

-- CreateIndex
CREATE INDEX "FurRecord_plantCode_idx" ON "FurRecord"("plantCode");
