import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function createRoutine(req: Request, res: Response) {
  const { name, exercises } = req.body;
  const userId = req.user?.sub;

  if (!name || !userId) return res.status(400).json({ message: "Name and userId are required" });

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const routine = await prisma.routine.create({
        data: { name, userId },
      });

      const routineExercisesData = exercises.map((exercise: any) => ({
        routineId: routine.id,
        exerciseId: exercise.id,
      }));

      const routineExercises = await prisma.routineExercise.createManyAndReturn({
        data: routineExercisesData,
      });

      const sets: any = [];

      exercises.forEach((exercise: any, index: number) => {
        exercise.sets.forEach((set: any) =>
          sets.push({
            ...set,
            routineExerciseId: routineExercises[index].id,
          })
        );
      });

      await prisma.set.createManyAndReturn({
        data: sets,
      });

      return await prisma.routine.findUnique({
        where: { id: routine.id },
        include: {
          exercises: {
            include: {
              exercise: true,
              sets: true,
            },
          },
        },
      });
    });

    return res.status(201).json({
      message: "Routine created successfully",
      routine: result,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "An routine with this name already exists." });
    }

    console.error("Error creating routine:", error);
    return res.status(500).json({ error: "An error occurred while creating the routine." });
  }
}

export async function getUserRoutines(req: Request, res: Response) {
  const { sub: userId } = req.user ?? {};
  try {
    if (userId) {
      const routines = await prisma.routine.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          exercises: {
            select: {
              exercise: {
                select: {
                  name: true,
                },
              },
              sets: {
                select: {
                  reps: true,
                  weight: true,
                  restTime: true,
                },
              },
            },
          },
        },
      });

      const formattedRoutines = routines.map((routine) => ({
        id: routine.id,
        name: routine.name,
        exercises: routine.exercises.map((exercise) => ({
          name: exercise.exercise.name,
          sets: exercise.sets,
        })),
      }));

      if (!routines) {
        return res.status(404).json({ error: "Routines not found", data: [] });
      }

      return res.status(200).json({ data: formattedRoutines });
    }
  } catch (error) {
    console.error("Error fetching routines:", error);
    return res.status(500).json({ error: "An error occurred while fetching the routines." });
  }
}
