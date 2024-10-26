/*
  Warnings:

  - You are about to drop the column `author` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Funding` table. All the data in the column will be lost.
  - You are about to drop the column `sponsor` on the `FundingEntry` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Funding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sponsorId` to the `FundingEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Funding" DROP COLUMN "author",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FundingEntry" DROP COLUMN "sponsor",
ADD COLUMN     "sponsorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funding" ADD CONSTRAINT "Funding_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingEntry" ADD CONSTRAINT "FundingEntry_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
