/*
  Warnings:

  - You are about to drop the column `console` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "console",
ADD COLUMN     "gameDevice" TEXT;
