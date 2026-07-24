import { getUserData } from "@/api/user";
import HomeCard from "@/components/HomeCard";
import { useAuth } from "@/context/authContext";
import {
  calculateActiveDays,
  calculateWorkoutsThisWeek,
  calulateStreak,
} from "@/utils/user-stats";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { session, signOut } = useAuth();
  {
    /*useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      try {
        const exercisesData = await getExercises({ muscle, equipment });
        setExercises(exercisesData);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        setError(
          (err as Error).message ||
            "Failed to load exercises. Please try again.",
        );
      }

      setIsLoading(false);
    };
    fetchExercises();
  }, [muscle, equipment]);

  */
  }
  const {
    isLoading,
    error,
    data: userStats,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () => getUserData(),
  });

  const streak = calulateStreak(userStats?.last28);
  const activeDays = calculateActiveDays(userStats?.last28);
  const workoutsThisWeek = calculateWorkoutsThisWeek(userStats?.last28);

  return (
    <View className="flex-1 pt-24 items-center bg-secondary">
      <View className="border border-border rounded-2xl p-4 bg-card/75 w-11/12">
        <Text className="text-white text-xl text-center">
          Welcome, {session?.user?.name || session?.user?.email}!
        </Text>
      </View>
      <View className="mt-4 w-11/12">
        {isLoading ? (
          <View className="flex justify-center items-center ">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : error ? (
          <View className="flex justify-center items-center">
            <Text className="text-red-500">Error loading data</Text>
          </View>
        ) : (
          <>
            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <HomeCard
                  label="Workouts (Last 7 Days)"
                  data={`${workoutsThisWeek.toString()} workout(s)`}
                  borderColor="rgba(234, 179, 8, 1)"
                />
              </View>
              <View className="flex-1">
                <HomeCard
                  label="Current workout streak"
                  data={
                    streak === 0 ? "No current streak" : `${streak} days 🔥`
                  }
                  borderColor="rgba(249, 115, 22, 1)"
                />
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1">
                <HomeCard
                  label="Total Workouts"
                  data={userStats?.totalWorkouts.toString() || "0"}
                />
              </View>
              <View className="flex-1">
                <HomeCard
                  label="Active Days (28d)"
                  data={`${activeDays}/28`}
                  borderColor="rgba(200, 0, 0, 1)"
                />
              </View>
            </View>
          </>
        )}
      </View>
      {/*TODO Quick action buttons */}
      <View className="flex-row mt-8 mb-4 mx-4">
        <TouchableOpacity className=" flex-1 bg-card/75 border-2 border-border mt-2 p-4 rounded-2xl w-11/12 mx-auto">
          <Text className="text-muted-foreground text-center font-semibold">
            Start a new workout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
