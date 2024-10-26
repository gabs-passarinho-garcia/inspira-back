/*
  Warnings:

  - The values [SUCCESS,FAIL] on the enum `FundingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserTypeRole" AS ENUM ('CREATOR', 'SPONSOR', 'CURATOR');

-- AlterEnum
BEGIN;
CREATE TYPE "FundingStatus_new" AS ENUM ('PENDING', 'ONGOING', 'SUCCESSFUL', 'FAILED', 'CANCELED');
ALTER TABLE "Funding" ALTER COLUMN "status" TYPE "FundingStatus_new" USING ("status"::text::"FundingStatus_new");
ALTER TYPE "FundingStatus" RENAME TO "FundingStatus_old";
ALTER TYPE "FundingStatus_new" RENAME TO "FundingStatus";
DROP TYPE "FundingStatus_old";
COMMIT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityState" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "role" "UserTypeRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_documentNumber_key" ON "User"("documentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
