import { useAuth } from "@/context/authContext";
import { Pressable, Text, View } from "react-native";
import "../global.css";

export default function Index() {
  const { session, signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-xl mb-4">
        Welcome, {session?.user?.name || session?.user?.email}!
      </Text>
      <Text className="text-white/70 mb-8">You are signed in</Text>
      <Pressable onPress={signOut}>
        {({ pressed }) => (
          <View
            className={`bg-red-500 px-6 py-3 rounded ${pressed ? "opacity-70" : "opacity-100"}`}
          >
            <Text className="text-white font-bold">Sign Out</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
