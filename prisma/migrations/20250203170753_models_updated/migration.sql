/*
  Warnings:

  - You are about to drop the column `is_system_generated` on the `tracker` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tracker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tracker" DROP CONSTRAINT "tracker_userId_fkey";

-- DropIndex
DROP INDEX "tracker_id_idx";

-- AlterTable
ALTER TABLE "tracker" DROP COLUMN "is_system_generated",
DROP COLUMN "userId",
ADD COLUMN     "is_default" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "tracker_logged_at_idx" ON "tracker"("logged_at");
