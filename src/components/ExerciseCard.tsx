import { exerciseInfo } from "@/data/exercises";
import { Exercise } from "@/types/exercise";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const exerciseData = exerciseInfo[exercise.name as keyof typeof exerciseInfo];
  const router = useRouter();
  return (
    <View className="mx-2 rounded border-b border-white/20">
      <Pressable
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          padding: 8,
          backgroundColor: pressed ? "rgba(255, 255, 255, 0.1)" : "transparent",
        })}
        onPress={() => {
          router.navigate({
            pathname: "/exercises/[id]",
            params: { id: exercise.name },
          });
        }}
      >
        <Image
          source={{ uri: exercise.imgUrl ? exercise.imgUrl : "" }}
          className="w-20 h-20 rounded col-span-1"
        />

        <View className="flex-1 flex-col gap-2 min-w-0">
          <Text className="font-bold text-white" numberOfLines={1}>
            {exerciseData ? exerciseData.name : exercise.name}
          </Text>
          <Text className=" text-white" numberOfLines={1}>
            {exercise.muscleGroup.map((muscle) => muscle).join(", ")}
          </Text>
          <Text className=" text-white" numberOfLines={1}>
            {exercise.equipment.map((equipment) => equipment).join(", ")}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ExerciseCard;
