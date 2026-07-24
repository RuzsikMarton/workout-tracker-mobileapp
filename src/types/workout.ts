export type WorkoutStatsData = {
  id: string;
  createdAt: string;
  totalVolume: number;
  duration: number;
  _count: {
    workoutExercises: number;
  };
};
