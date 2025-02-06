import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getExercise(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: Number(id) },
    });

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    return res.status(200).json({ exercise });
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return res.status(500).json({ error: "An error occurred while fetching the exercise." });
  }
}

export async function getExercises(req: Request, res: Response) {
  try {
    const exercise = await prisma.exercise.findMany();

    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    return res.status(200).json({ exercise });
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return res.status(500).json({ error: "An error occurred while fetching the exercise." });
  }
}

export async function createExercise(req: Request, res: Response) {
  const { name, description, image, muscles } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const newExercise = await prisma.exercise.create({
      data: { name, description, image, muscles },
    });

    return res.status(201).json({
      message: "Exercise created successfully",
      exercise: newExercise,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "An exercise with this name already exists." });
    }

    console.error("Error creating exercise:", error);
    return res.status(500).json({ error: "An error occurred while creating the exercise." });
  }
}
