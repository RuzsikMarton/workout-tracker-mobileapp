import { useAuth } from "@/context/authContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { session, signOut } = useAuth();
  return (
    <View className="flex-1 bg-secondary justify-between">
      <View>
        <Text className="mx-4 mt-16 text-white/75 text-3xl font-bold">
          Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            /*Profile edit function*/
          }}
          className="bg-card/75 border-t border-b border-border mt-2 p-4 rounded-lg"
        >
          <Text className="text-white text-lg font-bold">
            {session?.user.name}
          </Text>
          <Text className="text-white text-sm">{session?.user.email}</Text>
        </TouchableOpacity>
        <Text className="text-white/75 text-base font-light mx-4 my-2">
          Account
        </Text>
        <View className="border-b border-t border-border">
          <TouchableOpacity className="flex-row items-center p-4 justify-between bg-card/75">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="person-outline"
                size={18}
                color="rgba(255, 255, 255, 0.75)"
              />
              <Text className="text-white text-base font-semibold">
                Account
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="rgba(255, 255, 255, 0.50)"
            />
          </TouchableOpacity>
        </View>
        <View className="border-b border-border">
          <TouchableOpacity className="flex-row items-center p-4 justify-between  bg-card/75">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="notifications-outline"
                size={18}
                color="rgba(255, 255, 255, 0.75)"
              />
              <Text className="text-white text-base font-semibold">
                Notifications
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="rgba(255, 255, 255, 0.50)"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-white/75 text-base font-light mx-4 my-2">
          Help & Support
        </Text>
        <View className="border-t border-b border-border">
          <TouchableOpacity className="flex-row items-center p-4 justify-between  bg-card/75">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="rgba(255, 255, 255, 0.75)"
              />
              <Text className="text-white text-base font-semibold">
                Getting Started Guide
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="rgba(255, 255, 255, 0.50)"
            />
          </TouchableOpacity>
        </View>
        <View className="border-b border-border">
          <TouchableOpacity className="flex-row items-center p-4 justify-between  bg-card/75">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="call-outline"
                size={18}
                color="rgba(255, 255, 255, 0.75)"
              />
              <Text className="text-white text-base font-semibold">
                Contact Us
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="rgba(255, 255, 255, 0.50)"
            />
          </TouchableOpacity>
        </View>
        <View className="border-b border-border">
          <TouchableOpacity className="flex-row items-center p-4 justify-between  bg-card/75">
            <View className="flex-row items-center gap-2">
              <Ionicons
                name="barbell-outline"
                size={18}
                color="rgba(255, 255, 255, 0.75)"
              />
              <Text className="text-white text-base font-semibold">About</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="rgba(255, 255, 255, 0.50)"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full p-2 my-4">
        <TouchableOpacity onPress={signOut}>
          <View className="bg-red-200 px-6 py-3 rounded">
            <Text className="text-red-600 font-bold text-center">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
