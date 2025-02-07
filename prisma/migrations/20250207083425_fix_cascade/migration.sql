-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_userId_fkey";

-- DropForeignKey
ALTER TABLE "xp" DROP CONSTRAINT "xp_userId_fkey";

-- AddForeignKey
ALTER TABLE "xp" ADD CONSTRAINT "xp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
