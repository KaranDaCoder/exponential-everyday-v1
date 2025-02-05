/*
  Warnings:

  - You are about to drop the `habitTracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "habitTracker" DROP CONSTRAINT "habitTracker_habitId_fkey";

-- DropTable
DROP TABLE "habitTracker";

-- CreateTable
CREATE TABLE "tracker" (
    "id" TEXT NOT NULL,
    "notes" VARCHAR(60),
    "logged_at" TIMESTAMP(3) NOT NULL,
    "is_system_generated" BOOLEAN NOT NULL DEFAULT true,
    "status" "HabitTrackerStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_tracker_updated" BOOLEAN NOT NULL DEFAULT false,
    "daily_difficulty" DECIMAL(65,30) NOT NULL,
    "expected_difficulty" DECIMAL(65,30) NOT NULL,
    "habitId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tracker_id_idx" ON "tracker"("id");

-- AddForeignKey
ALTER TABLE "tracker" ADD CONSTRAINT "tracker_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
