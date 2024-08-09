-- AlterEnum
ALTER TYPE "StatusProgram" ADD VALUE 'PAUSED';

-- AlterTable
ALTER TABLE "program_kids" ADD COLUMN     "finishedAt" TIMESTAMP(3);
