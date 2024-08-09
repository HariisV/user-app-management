/*
  Warnings:

  - The values [FINISHED] on the enum `StatusProgram` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusProgram_new" AS ENUM ('IN_PROGRESS', 'GOAL', 'FAIL', 'SUCCESS', 'PAUSED', 'DELETED');
ALTER TABLE "program_kids" ALTER COLUMN "status" TYPE "StatusProgram_new" USING ("status"::text::"StatusProgram_new");
ALTER TYPE "StatusProgram" RENAME TO "StatusProgram_old";
ALTER TYPE "StatusProgram_new" RENAME TO "StatusProgram";
DROP TYPE "StatusProgram_old";
COMMIT;
