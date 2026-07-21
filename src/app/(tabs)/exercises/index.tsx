import { getExercises } from "@/api/exercises";
import ExerciseCard from "@/components/ExerciseCard";
import { EQUIPMENT_TYPES, MUSCLE_GROUPS } from "@/constants/picker-data";
import { cn } from "@/lib/utils";
import BottomSheet, { BottomSheetView } from "@expo/ui/community/bottom-sheet";
import Picker from "@expo/ui/community/picker";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Exercises() {
  const muscleSheet = useRef<BottomSheet>(null);
  const equipmentSheet = useRef<BottomSheet>(null);

  const [muscle, setMuscle] = useState<string | undefined>(undefined);
  const [equipment, setEquipment] = useState<string | undefined>(undefined);
  const [temporaryMuscle, setTemporaryMuscle] = useState<string | undefined>(
    muscle ?? MUSCLE_GROUPS[0].value,
  );
  const [temporaryEquipment, setTemporaryEquipment] = useState<
    string | undefined
  >(equipment ?? EQUIPMENT_TYPES[0].value);

  const {
    data: exercises = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["exercises", { muscle, equipment }],
    queryFn: () => getExercises({ muscle, equipment }),
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-secondary">
        <Text className="text-red-500 text-lg">{error.message}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-secondary pt-16">
      <Text className="text-3xl font-bold m-4 text-white">Exercises</Text>
      <View className="flex-row justify-between w-screen p-2 gap-2">
        <TouchableOpacity
          className={cn(
            `flex-1 py-2 px-4 my-4 rounded ${muscle ? "bg-brand-primary" : "bg-brand-primary/50"}`,
          )}
          onPress={() => {
            setTemporaryMuscle(muscle ?? MUSCLE_GROUPS[0].value);
            muscleSheet.current?.present();
          }}
        >
          <Text className="text-white text-center font-semibold">
            {muscle
              ? MUSCLE_GROUPS.find((m) => m.value === muscle)?.label
              : "Any Muscle Group"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={cn(
            `flex-1 py-2 px-4 my-4 rounded ${equipment ? "bg-brand-primary" : "bg-brand-primary/50"}`,
          )}
          onPress={() => {
            setTemporaryEquipment(equipment ?? EQUIPMENT_TYPES[0].value);
            equipmentSheet.current?.present();
          }}
        >
          <Text className="text-white text-center font-semibold">
            {equipment
              ? EQUIPMENT_TYPES.find((e) => e.value === equipment)?.label
              : "Any Equipment"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={cn(
            `py-2 px-4 my-4 rounded ${equipment || muscle ? "bg-brand-primary" : "bg-brand-primary/50"}`,
          )}
          onPress={() => {
            setMuscle(undefined);
            setEquipment(undefined);
          }}
        >
          <Text className="text-white text-center font-semibold">X</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-t border-white/50"></View>
      {isFetching && !isLoading && <ActivityIndicator className="mb-2" />}
      {exercises.length === 0 ? (
        <View className="flex-1 justify-center items-center bg-secondary">
          <Text
            className="text-white/75 text-center text-lg"
            lineBreakMode="tail"
            numberOfLines={2}
          >
            No exercises found. Please try adjusting your filters.
          </Text>
        </View>
      ) : (
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <BottomSheet
        ref={muscleSheet}
        index={-1}
        snapPoints={["35%"]}
        enableDynamicSizing={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#454545" }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <View className="flex-row justify-end w-full">
            <TouchableOpacity
              className="py-2 px-4 m-4 bg-brand-hover rounded"
              onPress={() => {
                setMuscle(temporaryMuscle);
                muscleSheet.current?.dismiss();
              }}
            >
              <Text className="text-xl font-semibold text-white">Apply</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={{ width: "100%", height: "100%" }}
            selectedValue={temporaryMuscle ?? MUSCLE_GROUPS[0].value}
            onValueChange={(value) => setTemporaryMuscle(value)}
          >
            {MUSCLE_GROUPS.map((group: (typeof MUSCLE_GROUPS)[number]) => (
              <Picker.Item
                style={{ color: "white" }}
                key={group.value}
                label={group.label}
                value={group.value}
              />
            ))}
          </Picker>
        </BottomSheetView>
      </BottomSheet>
      <BottomSheet
        ref={equipmentSheet}
        index={-1}
        snapPoints={["35%"]}
        enableDynamicSizing={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#454545" }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <View className="flex-row justify-end w-full">
            <TouchableOpacity
              className="py-2 px-4 m-4 bg-brand-hover rounded"
              onPress={() => {
                setEquipment(temporaryEquipment);
                equipmentSheet.current?.dismiss();
              }}
            >
              <Text className="text-xl font-semibold text-white">Apply</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={{ width: "100%", height: "100%" }}
            selectedValue={temporaryEquipment ?? EQUIPMENT_TYPES[0].value}
            onValueChange={(value) => setTemporaryEquipment(value)}
          >
            {EQUIPMENT_TYPES.map(
              (equipment: (typeof EQUIPMENT_TYPES)[number]) => (
                <Picker.Item
                  style={{ color: "white" }}
                  key={equipment.value}
                  label={equipment.label}
                  value={equipment.value}
                />
              ),
            )}
          </Picker>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
