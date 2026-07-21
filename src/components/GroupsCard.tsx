import { Text, View } from "react-native";

const GroupsCard = ({ label, array }: { label: string; array: string[] }) => {
  return (
    <View className="border rounded-2xl bg-background/35 p-4 border-border flex-1">
      <View className="mb-2 border-b border-border pb-2 bg-background/25 -mx-4 px-4 -mt-4 pt-4 rounded-t-2xl">
        <Text className="text-white/75 text-medium uppercase">{label}</Text>
      </View>
      <View className="flex-row flex-wrap gap-2">
        {array.map((item) => (
          <View
            key={item}
            className="bg-background/25 border border-border rounded-full px-3 py-1"
          >
            <Text className="text-white text-medium uppercase">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default GroupsCard;
