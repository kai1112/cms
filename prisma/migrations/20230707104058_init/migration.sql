/*
  Warnings:

  - You are about to drop the column `userCreate_Id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userDelete_Id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userUpdate_Id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `category_Id` on the `Category_Game` table. All the data in the column will be lost.
  - You are about to drop the column `game_Id` on the `Category_Game` table. All the data in the column will be lost.
  - You are about to drop the column `userCreate_Id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userDelete_Id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userUpdate_Id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `role_Id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userCreate_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userUpdate_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userDelete_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userCreate_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDelete_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userUpdate_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Category_Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Category_Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCreate_id` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userCreate_Id_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userDelete_Id_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userUpdate_Id_fkey";

-- DropForeignKey
ALTER TABLE "Category_Game" DROP CONSTRAINT "Category_Game_category_Id_fkey";

-- DropForeignKey
ALTER TABLE "Category_Game" DROP CONSTRAINT "Category_Game_game_Id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userCreate_Id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userDelete_Id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_userUpdate_Id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_Id_fkey";

-- DropIndex
DROP INDEX "Category_userCreate_Id_key";

-- DropIndex
DROP INDEX "Category_userDelete_Id_key";

-- DropIndex
DROP INDEX "Category_userUpdate_Id_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "userCreate_Id",
DROP COLUMN "userDelete_Id",
DROP COLUMN "userUpdate_Id",
ADD COLUMN     "userCreate_id" INTEGER NOT NULL,
ADD COLUMN     "userDelete_id" INTEGER NOT NULL,
ADD COLUMN     "userUpdate_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category_Game" DROP COLUMN "category_Id",
DROP COLUMN "game_Id",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userCreate_Id",
DROP COLUMN "userDelete_Id",
DROP COLUMN "userUpdate_Id",
ADD COLUMN     "userCreate_id" INTEGER NOT NULL,
ADD COLUMN     "userDelete_id" INTEGER,
ADD COLUMN     "userUpdate_id" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_Id",
ADD COLUMN     "role_id" INTEGER NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_userCreate_id_key" ON "Category"("userCreate_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userUpdate_id_key" ON "Category"("userUpdate_id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userDelete_id_key" ON "Category"("userDelete_id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userCreate_id_fkey" FOREIGN KEY ("userCreate_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userUpdate_id_fkey" FOREIGN KEY ("userUpdate_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userDelete_id_fkey" FOREIGN KEY ("userDelete_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userCreate_id_fkey" FOREIGN KEY ("userCreate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userUpdate_id_fkey" FOREIGN KEY ("userUpdate_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userDelete_id_fkey" FOREIGN KEY ("userDelete_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Game" ADD CONSTRAINT "Category_Game_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category_Game" ADD CONSTRAINT "Category_Game_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
