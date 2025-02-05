/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `habit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `habit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "habit" DROP CONSTRAINT "habit_clerkUserId_fkey";

-- DropIndex
DROP INDEX "habit_clerkUserId_name_key";

-- AlterTable
ALTER TABLE "habit" DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "habit_userId_name_key" ON "habit"("userId", "name");

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
