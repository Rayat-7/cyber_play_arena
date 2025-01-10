/*
  Warnings:

  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_adminId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "BookingAdmin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "BookingAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookingAdmin_email_key" ON "BookingAdmin"("email");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "BookingAdmin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
