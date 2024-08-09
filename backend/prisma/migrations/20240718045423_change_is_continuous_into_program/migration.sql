/*
  Warnings:

  - You are about to drop the column `is_continuous` on the `program_kids` table. All the data in the column will be lost.
  - You are about to drop the column `success_cnt` on the `program_kids` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "program_kids" DROP COLUMN "is_continuous",
DROP COLUMN "success_cnt";

-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "is_continuous" "IsContinuous" NOT NULL DEFAULT 'CONTINUOUS',
ADD COLUMN     "success_cnt" INTEGER NOT NULL DEFAULT 0;
