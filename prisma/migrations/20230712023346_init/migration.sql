/*
  Warnings:

  - Added the required column `title` to the `User_update_game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User_update_category" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User_update_game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL;
