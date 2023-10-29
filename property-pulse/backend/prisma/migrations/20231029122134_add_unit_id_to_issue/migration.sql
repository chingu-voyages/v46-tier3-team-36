-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_unitId_fkey";

-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "unitId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
