import { PrismaClient } from "@prisma/client";

//npx ts-node populateExercises.ts to execute

const prisma = new PrismaClient();

const allExercises = [
  {
    name: "Press Arnold",
    description: "",
    image: "",
    muscles: ["shoulders", "triceps"],
  },
  {
    name: "Reverse Lateral Raises",
    description: "",
    image: "",
    muscles: ["shoulders", "traps"],
  },
  {
    name: "Seated Dumbbell Lateral Raises",
    description: "",
    image: "",
    muscles: ["shoulders"],
  },
  {
    name: "Smith Machine Press",
    description: "",
    image: "",
    muscles: ["shoulders", "triceps"],
  },
  {
    name: "Standing Cable Lateral Raises",
    description: "",
    image: "",
    muscles: ["shoulders"],
  },
  {
    name: "Standing Dumbbell Lateral Raises",
    description: "",
    image: "",
    muscles: ["shoulders"],
  },
  {
    name: "Bench Press",
    description: "",
    image: "",
    muscles: ["chest", "triceps", "shoulders"],
  },
  {
    name: "Cable Crossovers",
    description: "",
    image: "",
    muscles: ["chest"],
  },
  {
    name: "Incline Barbell Press",
    description: "",
    image: "",
    muscles: ["chest", "shoulders", "triceps"],
  },
  {
    name: "Incline Dumbbell Press",
    description: "",
    image: "",
    muscles: ["chest", "shoulders", "triceps"],
  },
  {
    name: "Lat Pulldown",
    description: "",
    image: "",
    muscles: ["back", "biceps"],
  },
  {
    name: "One-Arm Dumbbell Row",
    description: "",
    image: "",
    muscles: ["back", "biceps"],
  },
  {
    name: "Pull-Ups",
    description: "",
    image: "",
    muscles: ["back", "biceps"],
  },
  {
    name: "Seated Low Cable Row",
    description: "",
    image: "",
    muscles: ["back", "biceps"],
  },
  {
    name: "T-Bar Row",
    description: "",
    image: "",
    muscles: ["back", "biceps"],
  },
  {
    name: "Scott Curl (Preacher Curl with Dumbbell)",
    description: "",
    image: "",
    muscles: ["biceps"],
  },
  {
    name: "Standing EZ Bar Biceps Curl",
    description: "",
    image: "",
    muscles: ["biceps"],
  },
  {
    name: "Straight Bar Biceps Curl",
    description: "",
    image: "",
    muscles: ["biceps"],
  },
  {
    name: "Lying French Press",
    description: "",
    image: "",
    muscles: ["triceps"],
  },
  {
    name: "One-Arm Triceps Extension",
    description: "",
    image: "",
    muscles: ["triceps"],
  },
  {
    name: "Seated French Press",
    description: "",
    image: "",
    muscles: ["triceps"],
  },
  {
    name: "Triceps Rope Pushdown",
    description: "",
    image: "",
    muscles: ["triceps"],
  },
  {
    name: "45° Leg Press",
    description: "",
    image: "",
    muscles: ["quadriceps", "glutes"],
  },
  {
    name: "Hack Squat",
    description: "",
    image: "",
    muscles: ["quadriceps", "glutes"],
  },
  {
    name: "Leg Extension",
    description: "",
    image: "",
    muscles: ["quadriceps"],
  },
  {
    name: "Squat",
    description: "",
    image: "",
    muscles: ["quadriceps", "glutes", "hamstrings"],
  },
  {
    name: "Deadlift",
    description: "",
    image: "",
    muscles: ["hamstrings", "glutes", "back"],
  },
  {
    name: "Lying Leg Curl",
    description: "",
    image: "",
    muscles: ["hamstrings"],
  },
  {
    name: "Romanian Deadlift",
    description: "",
    image: "",
    muscles: ["hamstrings", "glutes", "back"],
  },
  {
    name: "Calf Raises",
    description: "",
    image: "",
    muscles: ["calves"],
  },
];

async function createExercisesBatch() {
  try {
    await prisma.exercise.createMany({
      data: allExercises,
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
