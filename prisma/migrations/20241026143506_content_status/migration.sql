/*
  Warnings:

  - The values [SUCCESS,FAIL] on the enum `FundingStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `status` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('WAITING_IA_APPROVAL', 'WAITING_CURATOR_APPROVAL', 'IA_REJECTED', 'CURATOR_REJECTED', 'WAITING_FUNDING', 'FUNDED', 'PRODUCING', 'PUBLISHED');

-- AlterEnum
BEGIN;
CREATE TYPE "FundingStatus_new" AS ENUM ('PENDING', 'ONGOING', 'SUCCESSFUL', 'FAILED', 'CANCELED');
ALTER TABLE "Funding" ALTER COLUMN "status" TYPE "FundingStatus_new" USING ("status"::text::"FundingStatus_new");
ALTER TYPE "FundingStatus" RENAME TO "FundingStatus_old";
ALTER TYPE "FundingStatus_new" RENAME TO "FundingStatus";
DROP TYPE "FundingStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "status" "ContentStatus" NOT NULL;
