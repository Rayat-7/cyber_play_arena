/*
  Warnings:

  - Added the required column `console` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "console" TEXT NOT NULL;
