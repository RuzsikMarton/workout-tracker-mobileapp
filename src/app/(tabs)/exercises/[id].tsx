import { getExerciseById } from "@/api/exercises";
import ExerciseStatsTable from "@/components/ExerciseStatsTable";
import GroupsCard from "@/components/GroupsCard";
import UserExerciseStats from "@/components/UserExerciseStats";
import { exerciseInfo } from "@/data/exercises";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

const ExerciseId = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [toggle, setToggle] = useState<"last" | "best">("last");

  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exercise", id],
    queryFn: () => getExerciseById(id),
    enabled: !!id, // Only run the query if id is defined
  });

  useEffect(() => {
    if (!exercise) return;

    navigation.setOptions({
      title:
        exerciseInfo[exercise.exercise.name as keyof typeof exerciseInfo]
          ?.name ?? exercise.exercise.name,
    });
  }, [exercise, navigation]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <Text className="text-red-500 text-lg">{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-secondary">
      <View className="items-center p-2">
        <Image
          source={{ uri: exercise?.exercise.imgUrl ?? "" }}
          className="w-full h-96 my-4"
        />
        <View className="flex-row justify-between w-full">
          <GroupsCard
            label="Target Muscle:"
            array={exercise?.exercise.muscleGroup ?? []}
          />
          <GroupsCard
            label="Equipment:"
            array={exercise?.exercise.equipment ?? []}
          />
        </View>
        <View className="items-start w-full p-2">
          <Text className="text-white/75 text-lg font-medium uppercase mt-4 mb-2 w-full">
            Overview
          </Text>
          <Text className="text-white text-base">
            {exerciseInfo[exercise.exercise.name as keyof typeof exerciseInfo]
              ?.description ?? "No description available."}
          </Text>
        </View>
        <View className="w-full p-2">
          <Text className="mt-6 text-white/75 text-xl uppercase w-full text-center">
            Your Exercise Stats
          </Text>
          <UserExerciseStats stats={exercise?.userStats ?? null} />
        </View>
        {exercise?.userStats && (
          <View className="bg-card flex-row gap-4 mt-8 rounded-full py-2 px-4">
            <TouchableNativeFeedback onPress={() => setToggle("last")}>
              <Text
                className={cn(
                  "text-white font-semibold text-lg py-1 px-3 rounded-2xl",
                  toggle === "last" ? "bg-secondary" : "bg-card",
                )}
              >
                Last
              </Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => setToggle("best")}>
              <Text
                className={cn(
                  "text-white font-semibold text-lg py-1 px-3 rounded-2xl",
                  toggle === "best" ? "bg-secondary" : "bg-card",
                )}
              >
                Best
              </Text>
            </TouchableNativeFeedback>
          </View>
        )}
        {exercise?.userStats && (
          <ExerciseStatsTable data={exercise} tableType={toggle} />
        )}
      </View>
    </ScrollView>
  );
};

export default ExerciseId;
