-- CreateEnum
CREATE TYPE "HabitStrength" AS ENUM ('CRAWLING', 'WALKING', 'RUNNING', 'SPRINTING', 'FLYING');

-- CreateEnum
CREATE TYPE "HabitCategory" AS ENUM ('HEALTH_FITNESS', 'PERSONAL_GROWTH', 'PRODUCTIVITY', 'MENTAL_WELLBEING', 'RELATIONSHIPS', 'FINANCES', 'SUSTAINABILITY', 'OTHER');

-- CreateEnum
CREATE TYPE "HabitStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'DISABLED');

-- CreateTable
CREATE TABLE "habit" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(35) NOT NULL,
    "description" VARCHAR(60) NOT NULL,
    "category" "HabitCategory" NOT NULL DEFAULT 'OTHER',
    "start_date" TIMESTAMP(3) NOT NULL,
    "status" "HabitStatus" NOT NULL DEFAULT 'UPCOMING',
    "set_reminder" BOOLEAN NOT NULL DEFAULT false,
    "start_difficulty" INTEGER NOT NULL DEFAULT 5,
    "current_difficulty" INTEGER NOT NULL DEFAULT 5,
    "average_difficulty" INTEGER NOT NULL DEFAULT 5,
    "start_strength" "HabitStrength" NOT NULL DEFAULT 'RUNNING',
    "current_strength" "HabitStrength" NOT NULL DEFAULT 'RUNNING',
    "clerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "habit_name_idx" ON "habit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "habit_clerkUserId_name_key" ON "habit"("clerkUserId", "name");

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "user"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
