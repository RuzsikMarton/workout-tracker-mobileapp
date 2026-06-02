import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopWidth: 1,
          borderTopColor: "#333",
        },
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "barbell" : "barbell"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "podium" : "podium"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "accessibility" : "accessibility"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
