import { getExercises } from "@/api/exercises";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Exercises() {
  const [muscle, setMuscle] = useState<string | undefined>("chest");
  const [equipment, setEquipment] = useState<string | undefined>(undefined);

  const {
    data: exercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises({ muscle, equipment }),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <Text className="text-red-500 text-lg">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary py-16">
      <FlatList
        data={exercises}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
