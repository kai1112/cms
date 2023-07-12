/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Voucher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Voucher_name_key" ON "Voucher"("name");
