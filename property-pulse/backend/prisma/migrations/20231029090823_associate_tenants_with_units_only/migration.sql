/*
  Warnings:

  - You are about to drop the column `residenceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_residenceId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_unitId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "residenceId",
DROP COLUMN "unitId";

-- CreateTable
CREATE TABLE "_UnitToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UnitToUser_AB_unique" ON "_UnitToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_UnitToUser_B_index" ON "_UnitToUser"("B");

-- AddForeignKey
ALTER TABLE "_UnitToUser" ADD CONSTRAINT "_UnitToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnitToUser" ADD CONSTRAINT "_UnitToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
