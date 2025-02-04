/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `sets` on the `RoutineExercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "muscles" TEXT[],
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RoutineExercise" DROP COLUMN "sets",
ADD COLUMN     "sets" JSONB NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");
