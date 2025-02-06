import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createRoutine(req: Request, res: Response) {
  const { name, userId, exercises } = req.body;
  if (!name || !userId) return res.status(400).json({ message: "Name and userId are required" });

  try {
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

    const routineFromDB = await prisma.routine.findUnique({
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

    return res.status(201).json({
      message: "Routine created successfully",
      routineFromDB,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "An routine with this name already exists." });
    }

    console.error("Error creating routine:", error);
    return res.status(500).json({ error: "An error occurred while creating the routine." });
  }
}

/* export async function getRoutine(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const routine = await prisma.routine.findUnique({
      where: { id: Number(id) },
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

    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    const formattedRoutine = [routine].map((routine) => ({
      id: routine.id,
      name: routine.name,
      exercises: routine.exercises.map((exercise) => ({
        name: exercise.exercise.name,
        sets: exercise.sets,
      })),
    }));

    return res.status(200).json(formattedRoutine);
  } catch (error) {
    console.error("Error fetching routine:", error);
    return res.status(500).json({ error: "An error occurred while fetching the routine." });
  }
} */

export async function getUserRoutines(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const routines = await prisma.routine.findMany({
      where: { userId: id },
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
      return res.status(404).json({ message: "Routines not found" });
    }

    return res.status(200).json(formattedRoutines);
  } catch (error) {
    console.error("Error fetching routines:", error);
    return res.status(500).json({ error: "An error occurred while fetching the routines." });
  }
}
