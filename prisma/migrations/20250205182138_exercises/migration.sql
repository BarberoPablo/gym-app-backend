/*
  Warnings:

  - You are about to drop the column `exercise` on the `RoutineExercise` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `RoutineExercise` table. All the data in the column will be lost.
  - Added the required column `exerciseId` to the `RoutineExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutineExercise" DROP COLUMN "exercise",
DROP COLUMN "sets",
ADD COLUMN     "exerciseId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "muscles" TEXT[],

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "routineExerciseId" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "restTime" INTEGER,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_routineExerciseId_fkey" FOREIGN KEY ("routineExerciseId") REFERENCES "RoutineExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
