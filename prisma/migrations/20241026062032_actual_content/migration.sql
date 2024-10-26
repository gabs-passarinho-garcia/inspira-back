/*
  Warnings:

  - You are about to drop the column `body` on the `Content` table. All the data in the column will be lost.
  - Added the required column `author` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentCategory" AS ENUM ('FILM', 'VIDEO', 'DESIGN', 'FASHION', 'PHOTOGRAPHY', 'GAME', 'MUSIC', 'PODCAST', 'COMICS', 'LITERATURE', 'THEATER', 'DANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "FundingStatus" AS ENUM ('PENDING', 'ONGOING', 'SUCCESS', 'FAIL');

-- CreateEnum
CREATE TYPE "FundingType" AS ENUM ('ALL_OR_NOTHING', 'KEEP_IT_ALL');

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "body",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "category" "ContentCategory" NOT NULL,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "place" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT;

-- CreateTable
CREATE TABLE "Funding" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" INTEGER NOT NULL,
    "current" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "status" "FundingStatus" NOT NULL,
    "type" "FundingType" NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Funding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingEntry" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "sponsor" TEXT NOT NULL,
    "fundingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "FundingEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funding_contentId_key" ON "Funding"("contentId");

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "Funding_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingEntry" ADD CONSTRAINT "FundingEntry_fundingId_fkey" FOREIGN KEY ("fundingId") REFERENCES "Funding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
