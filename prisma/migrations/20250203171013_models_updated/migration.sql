/*
  Warnings:

  - The values [UPCOMING] on the enum `HabitTrackerStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HabitTrackerStatus_new" AS ENUM ('ACTIVE', 'MISSED', 'COMPLETED');
ALTER TABLE "tracker" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tracker" ALTER COLUMN "status" TYPE "HabitTrackerStatus_new" USING ("status"::text::"HabitTrackerStatus_new");
ALTER TYPE "HabitTrackerStatus" RENAME TO "HabitTrackerStatus_old";
ALTER TYPE "HabitTrackerStatus_new" RENAME TO "HabitTrackerStatus";
DROP TYPE "HabitTrackerStatus_old";
ALTER TABLE "tracker" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;
