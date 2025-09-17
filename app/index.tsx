import { evaluateExpression } from "@/utils/Calculator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonPad from "../components/ButtonPad";
import Display from "../components/Display";

export default function CalculatorScreen() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const router = useRouter();

  const handlePress = async (val: string) => {
    if (val === "C") {
      setInput("");
      setResult("");
    } else if (val === "=") {
      try {
        const evalResult = evaluateExpression(input);
        setResult(evalResult.toString());

        // Save to history
        const historyItem = {
          expression: input,
          result: evalResult.toString(),
        };
        const stored = await AsyncStorage.getItem("history");
        const parsed = stored ? JSON.parse(stored) : [];
        parsed.unshift(historyItem);
        await AsyncStorage.setItem("history", JSON.stringify(parsed));
      } catch {
        setResult("Error");
      }
    } else {
      setInput((prev) => prev + val);
    }
  };

  return (
    <View className="flex-1 bg-black p-4">
      <Display input={input} result={result} />
      <ButtonPad onPress={handlePress} />

      <TouchableOpacity
        className="mt-4 bg-yellow-400 rounded-full p-3"
        onPress={() => router.push("/history")}
      >
        <Text className="text-center text-black font-bold">View History</Text>
      </TouchableOpacity>
    </View>
  );
}
