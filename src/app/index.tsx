import { Image, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-secondary">
      <Image
        source={require("@/assets/images/logo.webp")}
        resizeMode="contain"
      />
    </View>
  );
}
