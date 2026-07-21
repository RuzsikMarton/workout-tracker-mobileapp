export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string[];
  equipment: string[];
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type ExerciseSet = {
  completed: boolean;
  createdAt: string;
  id: string;
  reps: number;
  setNumber: number;
  updatedAt: string;
  weight: number;
  workoutExerciseId: string;
};
