/*
  Warnings:

  - Added the required column `kidId` to the `programs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IsContinuous" AS ENUM ('PARTIAL', 'CONTINUOUS');

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "kidId" INTEGER;

-- AlterTable
ALTER TABLE "program_kids" ADD COLUMN     "is_continuous" "IsContinuous" NOT NULL DEFAULT 'CONTINUOUS',
ADD COLUMN     "success_cnt" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "kidId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "kids"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "kids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
