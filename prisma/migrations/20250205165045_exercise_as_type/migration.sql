/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `RoutineExercise` table. All the data in the column will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exercise` to the `RoutineExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RoutineExercise" DROP CONSTRAINT "RoutineExercise_exerciseId_fkey";

-- AlterTable
ALTER TABLE "RoutineExercise" DROP COLUMN "exerciseId",
ADD COLUMN     "exercise" JSONB NOT NULL;

-- DropTable
DROP TABLE "Exercise";
