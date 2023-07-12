/*
  Warnings:

  - You are about to drop the column `date1` on the `Voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "date1",
ADD COLUMN     "expired" INTEGER;
