/*
  Warnings:

  - A unique constraint covering the columns `[habitId,logged_at,userId]` on the table `tracker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `tracker` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tracker_habitId_logged_at_key";

-- AlterTable
ALTER TABLE "tracker" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tracker_habitId_logged_at_userId_key" ON "tracker"("habitId", "logged_at", "userId");

-- AddForeignKey
ALTER TABLE "tracker" ADD CONSTRAINT "tracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
