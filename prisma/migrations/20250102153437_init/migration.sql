/*
  Warnings:

  - The primary key for the `Slot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `console` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookingAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_slotId_fkey";

-- AlterTable
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_pkey",
DROP COLUMN "console",
ADD COLUMN     "bookedBy" TEXT,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "game" TEXT,
ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" DOUBLE PRECISION,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Slot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Slot_id_seq";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "BookingAdmin";

-- DropTable
DROP TABLE "Game";
