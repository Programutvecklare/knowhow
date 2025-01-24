/*
  Warnings:

  - You are about to drop the column `test` on the `Challenge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "test",
ADD COLUMN     "tips" TEXT;
