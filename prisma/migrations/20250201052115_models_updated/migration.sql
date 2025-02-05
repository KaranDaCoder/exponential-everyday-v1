/*
  Warnings:

  - You are about to drop the column `userId` on the `habitTracker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "habitTracker" DROP CONSTRAINT "habitTracker_userId_fkey";

-- AlterTable
ALTER TABLE "habitTracker" DROP COLUMN "userId";
