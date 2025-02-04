import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exercises = [
  {
    name: "Deadlift",
    image: "https://gymgeek.com/wp-content/uploads/2023/10/traditional-deadlift.png",
  },
  {
    name: "Leg Press",
    image: "https://gymgeek.com/wp-content/uploads/2023/10/leg-press-how-to.png",
  },
  {
    name: "Leg Curl",
    image: "https://gymgeek.com/wp-content/uploads/2024/02/lying-leg-curls-square.png",
  },
  {
    name: "Leg Extensions ",
    image: "https://gymgeek.com/wp-content/uploads/2024/02/machine-leg-extensions.png",
  },
  {
    name: "Calf Raises",
    image: "https://gymgeek.com/wp-content/uploads/2023/10/calf-raises.png",
  },
  {
    name: "Lateral Raises",
    image: "https://gymgeek.com/wp-content/uploads/2024/02/dumbbell-lateral-raises-square.png",
  },
  {
    name: "Reverse Lateral Raises",
    image: "",
  },
];

async function createExercisesBatch() {
  try {
    await prisma.exercise.createMany({
      data: exercises,
      skipDuplicates: true, // Evita errores por duplicados
    });

    console.log("All exercises have been created successfully.");
  } catch (error) {
    console.error("Error creating exercises:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createExercisesBatch();
