import { getExerciseById } from "@/api/exercises";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const ExerciseId = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercise", id],
    queryFn: () => getExerciseById(id),
    enabled: !!id, // Only run the query if id is defined
  });

  console.log("Exercise data:", exercise);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default ExerciseId;
