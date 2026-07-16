import { Stack } from "expo-router";

export default function ExercisesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Exercises",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Exercise",
        }}
      />
    </Stack>
  );
}
