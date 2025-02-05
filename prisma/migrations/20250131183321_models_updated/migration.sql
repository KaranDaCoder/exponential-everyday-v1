/*
  Warnings:

  - Added the required column `userId` to the `habitTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "habitTracker" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "habitTracker" ADD CONSTRAINT "habitTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
