/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the `RoutineDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoutineDetail" DROP CONSTRAINT "RoutineDetail_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "RoutineDetail" DROP CONSTRAINT "RoutineDetail_routineId_fkey";

-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "RoutineDetail";

-- CreateTable
CREATE TABLE "RoutineExercise" (
    "id" SERIAL NOT NULL,
    "routineId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "sets" TEXT NOT NULL,

    CONSTRAINT "RoutineExercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
