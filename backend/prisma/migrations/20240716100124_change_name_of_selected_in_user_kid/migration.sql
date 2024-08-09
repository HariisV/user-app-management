/*
  Warnings:

  - You are about to drop the column `is_select` on the `users_kids` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users_kids" DROP COLUMN "is_select",
ADD COLUMN     "is_selected" BOOLEAN NOT NULL DEFAULT false;
