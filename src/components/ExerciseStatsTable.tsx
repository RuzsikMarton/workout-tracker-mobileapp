import { ExerciseSet } from "@/types/exercise";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View } from "react-native";

const ExerciseStatsTable = ({
  data,
  tableType,
}: {
  data: any;
  tableType: "last" | "best";
}) => {
  const tableHead = ["Set", "Weight", "Reps", "Volume"];
  return (
    <View className="bg-card rounded-2xl border border-border w-full p-2 mt-2">
      <View className="flex-row p-1 border-b border-border">
        {tableHead.map((item, index) => (
          <View key={index} className="flex-1">
            <Text className="font-semibold text-white/75 text-center">
              {item}
            </Text>
          </View>
        ))}
      </View>
      {data && tableType === "last"
        ? data?.lastWorkoutExercise.sets.map((set: ExerciseSet) => (
            <View key={set.setNumber} className="flex-row p-1">
              <View className="flex-1">
                <Text className="text-white text-center">{set.setNumber}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-center">
                  {set.weight}
                  <Text className="text-white/75"> kg</Text>
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-center">{set.reps}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white text-center">
                  {set.weight * set.reps}
                  <Text className="text-white/75"> kg</Text>
                </Text>
              </View>
            </View>
          ))
        : tableType === "best"
          ? data?.bestWorkoutExercise.sets.map((set: ExerciseSet) => (
              <View key={set.setNumber} className="flex-row p-1">
                <View className="flex-1">
                  <Text className="text-white text-center">
                    {set.setNumber}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-center">
                    {set.weight}
                    <Text className="text-white/75"> kg</Text>
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-center">{set.reps}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-center">
                    {set.weight * set.reps}
                    <Text className="text-white/75"> kg</Text>
                  </Text>
                </View>
              </View>
            ))
          : null}
      <View className="flex items-end">
        {tableType === "last" && (
          <View className="flex-row items-center mt-2 px-1 gap-1">
            <Ionicons
              name="calendar-outline"
              size={16}
              color="rgba(255, 255, 255, 0.75)"
            />
            <Text className="text-white/75 text-center">
              {new Date(
                data.lastWorkoutExercise.createdAt,
              ).toLocaleDateString()}
            </Text>
          </View>
        )}
        {tableType === "best" && (
          <View className="flex-row items-center mt-2 px-1 gap-1">
            <Ionicons
              name="calendar-outline"
              size={16}
              color="rgba(255, 255, 255, 0.75)"
            />
            <Text className="text-white/75 text-center ">
              {new Date(
                data.bestWorkoutExercise.createdAt,
              ).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ExerciseStatsTable;
