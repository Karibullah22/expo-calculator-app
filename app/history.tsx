import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    } catch (err) {
      console.warn("clear history error", err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View>
        {/* Header with Back + Clear All */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 px-3 py-1 rounded-md bg-gray-700"
          >
            <Text className="text-white text-base">Back</Text>
          </TouchableOpacity>

          <Text className="text-black text-xl font-bold">History</Text>

          <TouchableOpacity
            onPress={clearHistory}
            className="ml-3 px-3 py-1 rounded-md bg-red-500"
          >
            <Text className="text-white text-base">Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* History list */}
        <FlatList
          data={history}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View className="border-b border-gray-200 py-2">
              <Text className="text-gray-700">{item.expression}</Text>
              <Text className="text-black font-bold">{item.result}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-gray-500 text-center mt-10">
              No history yet
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}
