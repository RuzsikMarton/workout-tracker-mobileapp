import { Stack } from "expo-router";

export default function ExercisesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Exercises",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Exercise",
          headerStyle: {
            backgroundColor: "#18181b",
          },
          headerTintColor: "#fff", // back button & title color
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
