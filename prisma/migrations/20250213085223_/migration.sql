/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `xp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "xp_userId_challengeId_key" ON "xp"("userId", "challengeId");
