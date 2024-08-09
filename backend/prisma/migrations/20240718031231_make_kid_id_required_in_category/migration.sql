/*
  Warnings:

  - Made the column `kidId` on table `categories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_kidId_fkey";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "kidId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "kids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
