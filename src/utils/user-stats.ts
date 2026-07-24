import type { WorkoutStatsData } from "../types/workout";

export const calulateStreak = (workouts?: WorkoutStatsData[]) => {
  if (!workouts || workouts.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison

  const workoutDates = [
    ...new Set(
      workouts.map((w) => {
        const d = new Date(w.createdAt);
        d.setHours(0, 0, 0, 0); // Set to midnight for accurate comparison
        return d.getTime();
      }),
    ),
  ].sort((a, b) => b - a); // Sort in descending order

  let streak = 0;
  let currentDate = today.getTime();

  // Check if today or yesterday has a workout (grace period)
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (
    !workoutDates.includes(currentDate) &&
    !workoutDates.includes(yesterday.getTime())
  ) {
    return 0;
  }

  for (const dateTime of workoutDates) {
    if (
      dateTime === currentDate ||
      dateTime == currentDate - 24 * 60 * 60 * 1000
    ) {
      streak++;
      currentDate = dateTime - 24 * 60 * 60 * 1000; // Move to the previous day
    } else {
      break; // Streak is broken
    }
  }

  return streak;
};

export const calculateActiveDays = (workouts?: WorkoutStatsData[]) => {
  if (!workouts || workouts.length === 0) return 0;

  const activeDaysSet = new Set(
    workouts.map((w) => new Date(w.createdAt).toDateString()),
  );

  return activeDaysSet.size;
};

export const calculateWorkoutsThisWeek = (workouts?: WorkoutStatsData[]) => {
  if (!workouts || workouts.length === 0) return 0;

  const workoutsThisWeek = workouts.filter((w) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(w.createdAt) >= sevenDaysAgo;
  });
  return workoutsThisWeek.length;
};
