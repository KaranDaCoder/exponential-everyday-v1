-- CreateEnum
CREATE TYPE "HabitTrackerStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'MISSED', 'COMPLETED');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userTimeZone" TEXT NOT NULL DEFAULT 'American/Chicago';

-- CreateTable
CREATE TABLE "HabitTracker" (
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

    CONSTRAINT "HabitTracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HabitTracker" ADD CONSTRAINT "HabitTracker_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitTracker" ADD CONSTRAINT "HabitTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
