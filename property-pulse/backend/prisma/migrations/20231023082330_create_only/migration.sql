/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('manager', 'tenant');

-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('maintenanceRequest', 'complaint', 'inquiry');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Issue" (
    "id" SERIAL NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "issueType" "IssueType" NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
