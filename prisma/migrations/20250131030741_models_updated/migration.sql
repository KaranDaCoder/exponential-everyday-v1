/*
  Warnings:

  - You are about to drop the column `average_difficulty` on the `habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "habit" DROP COLUMN "average_difficulty",
ADD COLUMN     "expected_difficulty" DECIMAL(65,30) NOT NULL DEFAULT 5.0;
