import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState<
    { expression: string; result: string }[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        const stored = await AsyncStorage.getItem("history");
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      };
      loadHistory();
    }, [])
  );

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-xl font-bold mb-4">History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View className="border-b border-gray-700 py-2">
            <Text className="text-gray-300">{item.expression}</Text>
            <Text className="text-white font-bold">{item.result}</Text>
          </View>
        )}
      />
    </View>
  );
}
