-- DropForeignKey
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_userId_fkey";

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
