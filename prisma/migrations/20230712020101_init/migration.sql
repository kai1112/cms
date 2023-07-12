/*
  Warnings:

  - You are about to drop the column `userUpdate_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userUpdate_id` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userUpdate_id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userUpdate_id_fkey";

-- DropIndex
DROP INDEX "Category_userCreate_id_key";

-- DropIndex
DROP INDEX "Category_userDelete_id_key";

-- DropIndex
DROP INDEX "Category_userUpdate_id_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "userUpdate_id";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userUpdate_id";

-- CreateTable
CREATE TABLE "User_update_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_update_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_update_game" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_update_game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_update_category" ADD CONSTRAINT "User_update_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_update_category" ADD CONSTRAINT "User_update_category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_update_game" ADD CONSTRAINT "User_update_game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_update_game" ADD CONSTRAINT "User_update_game_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
