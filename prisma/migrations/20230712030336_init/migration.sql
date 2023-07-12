/*
  Warnings:

  - You are about to drop the column `userUpdate_id` on the `Voucher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Voucher" DROP CONSTRAINT "Voucher_userUpdate_id_fkey";

-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "userUpdate_id",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "user_voucher" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "voucher_id" INTEGER NOT NULL,

    CONSTRAINT "user_voucher_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_voucher" ADD CONSTRAINT "user_voucher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_voucher" ADD CONSTRAINT "user_voucher_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
