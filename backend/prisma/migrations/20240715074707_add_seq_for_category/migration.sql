/*
  Warnings:

  - You are about to drop the column `categoryId` on the `programs` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `programs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "programs" DROP CONSTRAINT "programs_categoryId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "seq" INTEGER;

-- AlterTable
ALTER TABLE "programs" DROP COLUMN "categoryId",
ADD COLUMN     "seq" INTEGER,
ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
