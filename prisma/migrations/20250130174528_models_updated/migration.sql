-- AlterTable
ALTER TABLE "habit" ALTER COLUMN "start_difficulty" SET DEFAULT 5.0,
ALTER COLUMN "start_difficulty" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "current_difficulty" SET DEFAULT 5.0,
ALTER COLUMN "current_difficulty" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "average_difficulty" SET DEFAULT 5.0,
ALTER COLUMN "average_difficulty" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "habitTracker" ALTER COLUMN "daily_difficulty" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "expected_difficulty" SET DATA TYPE DECIMAL(65,30);
