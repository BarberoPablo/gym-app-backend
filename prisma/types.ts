export type Set = {
  reps: number;
  weight: number;
};

export type Exercise = {
  name: string;
  description?: string;
  image?: string;
  muscles?: Muscle[];
};

export enum Muscle {
  Chest = "Chest",
  Back = "Back",
  Shoulders = "Shoulders",
  Biceps = "Biceps",
  Triceps = "Triceps",
  Legs = "Legs",
  Core = "Core",
}
