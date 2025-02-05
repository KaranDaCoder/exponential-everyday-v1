/*
  Warnings:

  - A unique constraint covering the columns `[habitId,logged_at]` on the table `tracker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tracker_habitId_logged_at_key" ON "tracker"("habitId", "logged_at");
