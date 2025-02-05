export type Set = {
  reps: number;
  weight: number;
};

export type Exercise = {
  name: string;
  description?: string;
  image?: string;
  muscles?: string[];
};

/**
 * model Exercise {
 * id              Int
 * name            String
 * description     String?
 * image           String?
 * muscles         String[]
 * RoutineExercise RoutineExercise[]
 * }
 */
