/*
  Warnings:

  - You are about to drop the `category_game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `voucher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category_game" DROP CONSTRAINT "category_game_category_Id_fkey";

-- DropForeignKey
ALTER TABLE "category_game" DROP CONSTRAINT "category_game_game_Id_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_game_id_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_userSend_id_fkey";

-- DropForeignKey
ALTER TABLE "voucher" DROP CONSTRAINT "voucher_userCreate_id_fkey";

-- DropForeignKey
ALTER TABLE "voucher" DROP CONSTRAINT "voucher_userUpdate_id_fkey";

-- DropTable
DROP TABLE "category_game";

-- DropTable
DROP TABLE "feedback";

-- DropTable
DROP TABLE "voucher";

-- CreateTable
CREATE TABLE "Category_Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_Id" INTEGER NOT NULL,
    "game_Id" INTEGER NOT NULL,

    CONSTRAINT "Category_Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "userCreate_id" INTEGER NOT NULL,
    "userUpdate_id" INTEGER NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(3000) NOT NULL,
    "email" TEXT,
    "userSend_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category_Game" ADD CONSTRAINT "Category_Game_category_Id_fkey" FOREIGN KEY ("category_Id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Game" ADD CONSTRAINT "Category_Game_game_Id_fkey" FOREIGN KEY ("game_Id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_userCreate_id_fkey" FOREIGN KEY ("userCreate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_userUpdate_id_fkey" FOREIGN KEY ("userUpdate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userSend_id_fkey" FOREIGN KEY ("userSend_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
