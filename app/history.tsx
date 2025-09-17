import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const HISTORY_KEY = "@calc_history_v1";

export default function HistoryScreen() {
  const [history, setHistory] = useState<
    { expression: string; result: string }[]
  >([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        try {
          const stored = await AsyncStorage.getItem(HISTORY_KEY);
          if (stored) {
            setHistory(JSON.parse(stored));
          } else {
            setHistory([]);
          }
        } catch (err) {
          console.warn("history load error", err);
          setHistory([]);
        }
      };
      loadHistory();
    }, [])
  );

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 px-3 py-1 rounded-md bg-gray-700"
        >
          <Text className="text-white text-base">Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">History</Text>
      </View>
      <FlatList
        data={history}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 py-2">
            <Text className="text-black-300">{item.expression}</Text>
            <Text className="text-black font-bold">{item.result}</Text>
          </View>
        )}
      />
    </View>
  );
}
