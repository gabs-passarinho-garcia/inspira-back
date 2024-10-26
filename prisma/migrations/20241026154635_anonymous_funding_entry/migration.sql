/*
  Warnings:

  - Added the required column `anonymous` to the `FundingEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Funding" ALTER COLUMN "goal" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "current" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "FundingEntry" ADD COLUMN     "anonymous" BOOLEAN NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(65,30);
