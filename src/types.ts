export enum Muscle {
  chest = "chest",
  back = "back",
  shoulders = "shoulders",
  biceps = "biceps",
  triceps = "triceps",
  quadriceps = "quadriceps",
  hamstrings = "hamstrings",
  calves = "calves",
}
export type ExerciseInfo = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  muscles?: Muscle[];
};
