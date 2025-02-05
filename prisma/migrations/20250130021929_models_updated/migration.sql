/*
  Warnings:

  - You are about to drop the `HabitTracker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitTracker" DROP CONSTRAINT "HabitTracker_habitId_fkey";

-- DropForeignKey
ALTER TABLE "HabitTracker" DROP CONSTRAINT "HabitTracker_userId_fkey";

-- DropTable
DROP TABLE "HabitTracker";

-- CreateTable
CREATE TABLE "habitTracker" (
    "id" TEXT NOT NULL,
    "notes" VARCHAR(60),
    "logged_at" TIMESTAMP(3) NOT NULL,
    "is_system_generated" BOOLEAN NOT NULL DEFAULT true,
    "status" "HabitTrackerStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_tracker_updated" BOOLEAN NOT NULL DEFAULT false,
    "daily_difficulty" INTEGER NOT NULL,
    "expected_difficulty" INTEGER NOT NULL,
    "growth_rate_multiplier" DECIMAL(65,30) NOT NULL DEFAULT 1.01,
    "habitId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habitTracker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "habitTracker_id_idx" ON "habitTracker"("id");

-- AddForeignKey
ALTER TABLE "habitTracker" ADD CONSTRAINT "habitTracker_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habitTracker" ADD CONSTRAINT "habitTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
