import { Text, View } from "react-native";

const UserExerciseStats = ({ stats }: { stats: any | null }) => {
  if (!stats) {
    return (
      <View className="py-8">
        <View className="mx-auto max-w-xl rounded-2xl border border-dashed border-border bg-card p-6 text-center shadow-sm">
          <Text className="text-white text-lg font-semibold text-center">
            No stats recorded yet
          </Text>
          <Text className="mt-2 text-sm text-muted-foreground text-center">
            You haven't logged any workouts with this exercise yet. Start
            tracking your workouts to see your stats here.
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View className="w-full bg-card rounded-2xl border border-border mt-2">
      <View className="flex-row">
        <View className="flex-1 border-b border-r border-border p-2">
          <Text className="text-white/75 text-lg font-small  mb-2">
            Heaviest Set
          </Text>
          <Text className="text-white text-lg font-small">
            {stats.bestSetWeight} kg x {stats.bestSetReps} reps
          </Text>
        </View>
        <View className="flex-1 border-b border-border p-2">
          <Text className="text-white/75 text-lg font-small  mb-2">
            Best Volume
          </Text>
          <Text className="text-white text-lg font-small">
            {stats.bestVolume} kg
          </Text>
        </View>
      </View>
      <View className="flex-row">
        <View className="flex-1 border-r border-border p-2">
          <Text className="text-white/75 text-lg font-small  mb-2">
            Best 1ERM
          </Text>
          <Text className="text-white text-lg font-small">
            {stats.bestE1RM} kg
          </Text>
        </View>
        <View className="flex-1 border-border p-2">
          <Text className="text-white/75 text-lg font-small  mb-2">
            Last Performed
          </Text>
          <Text className="text-white text-lg font-small">
            {new Date(stats.lastPerformed).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserExerciseStats;
