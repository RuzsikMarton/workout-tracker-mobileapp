import { useAuth } from "@/context/authContext";
import { Pressable, Text, View } from "react-native";

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
  return (
    <View className="flex-1 justify-center items-center bg-secondary">
      <Text className="text-white text-xl mb-4">
        Welcome, {session?.user?.name || session?.user?.email}!
      </Text>
      <Text className="text-white/70 mb-8">You are signed in</Text>
      <Pressable onPress={signOut}>
        {({ pressed }) => (
          <View
            className={`bg-yellow-500 px-6 py-3 rounded ${pressed ? "opacity-70" : "opacity-100"}`}
          >
            <Text className="text-white font-bold">Sign Out</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
