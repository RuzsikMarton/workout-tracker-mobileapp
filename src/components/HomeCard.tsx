import { Text, View } from "react-native";

type HomeCardProps = {
  borderColor?: string;
  label: string;
  data: string;
};

const HomeCard = ({ borderColor, label, data }: HomeCardProps) => {
  return (
    <View
      style={{
        borderColor: borderColor ? borderColor : "rgba(157, 0, 0, 1)",
        borderLeftWidth: 5,
        borderRadius: 12,
        backgroundColor: "rgba(23, 23, 23, 1)",
      }}
    >
      <View className="flex w-full justify-between p-4">
        <Text className="text-muted-foreground text-small uppercase">
          {label}
        </Text>
        <Text className="text-muted-foreground text-xl font-bold mt-1">
          {data}
        </Text>
      </View>
    </View>
  );
};

export default HomeCard;
