-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('ADMIN', 'PARENT', 'DOCTOR');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "KidGender" AS ENUM ('BOY', 'GIRL');

-- CreateEnum
CREATE TYPE "StatusProgram" AS ENUM ('IN_PROGRESS', 'FINISHED', 'DELETED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleUser" NOT NULL,
    "status" "StatusUser" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kids" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "rand" TEXT NOT NULL,
    "gender" "KidGender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "kids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_kids" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kidId" INTEGER NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_kids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,
    "depth" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "total_cnt" INTEGER NOT NULL,
    "goal_cnt" INTEGER NOT NULL,
    "is_goal_more_than" BOOLEAN NOT NULL DEFAULT false,
    "indicator" TEXT NOT NULL,
    "how_to" TEXT NOT NULL,
    "reinforcement" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_memos" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "memo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "program_memos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_kids" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "kidId" INTEGER NOT NULL,
    "status" "StatusProgram" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "program_kids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "program_kids_logs" (
    "id" SERIAL NOT NULL,
    "programKidId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "program_kids_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_kids_userId_kidId_key" ON "users_kids"("userId", "kidId");

-- AddForeignKey
ALTER TABLE "users_kids" ADD CONSTRAINT "users_kids_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_kids" ADD CONSTRAINT "users_kids_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "kids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programs" ADD CONSTRAINT "programs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_memos" ADD CONSTRAINT "program_memos_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_memos" ADD CONSTRAINT "program_memos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_kids" ADD CONSTRAINT "program_kids_programId_fkey" FOREIGN KEY ("programId") REFERENCES "programs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_kids" ADD CONSTRAINT "program_kids_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "kids"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
