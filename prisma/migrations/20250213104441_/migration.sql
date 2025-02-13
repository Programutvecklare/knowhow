/*
  Warnings:

  - Made the column `challengeId` on table `xp` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "xp" DROP CONSTRAINT "xp_challengeId_fkey";

-- AlterTable
ALTER TABLE "xp" ALTER COLUMN "challengeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "xp" ADD CONSTRAINT "xp_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
