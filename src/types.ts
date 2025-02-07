export type Muscle = "chest" | "back" | "shoulders" | "biceps" | "triceps" | "legs" | "core";

export type ExerciseInfo = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  muscles?: Muscle[];
};
