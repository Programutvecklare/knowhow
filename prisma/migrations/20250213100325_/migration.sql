-- DropForeignKey
ALTER TABLE "xp" DROP CONSTRAINT "xp_challengeId_fkey";

-- AlterTable
ALTER TABLE "xp" ALTER COLUMN "challengeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "xp" ADD CONSTRAINT "xp_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
