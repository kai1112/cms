/*
  Warnings:

  - You are about to drop the column `expired` on the `Voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "expired",
ADD COLUMN     "date1" INTEGER;
