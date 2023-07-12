/*
  Warnings:

  - The `expired` column on the `Voucher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "expired",
ADD COLUMN     "expired" TIMESTAMP(3);
