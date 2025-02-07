-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_userId_fkey";

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
