// app/index.tsx
import { evaluateExpression } from "@/utils/Calculator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonPad from "../components/ButtonPad";
import Display from "../components/Display";

const HISTORY_KEY = "@calc_history_v1";

export default function CalculatorScreen() {
  const router = useRouter();
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (!expression) {
      setResult("");
      return;
    }
    // quick preview: attempt to evaluate, ignore errors
    try {
      const r = evaluateExpression(expression);
      setResult(String(r));
    } catch {
      setResult("");
    }
  }, [expression]);

  const pushHistory = async (expr: string, res: string) => {
    try {
      const raw = await AsyncStorage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      parsed.unshift({
        id: String(Date.now()),
        expression: expr,
        result: res,
        timestamp: Date.now(),
      });
      await AsyncStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(parsed.slice(0, 200))
      );
    } catch (err) {
      console.warn("persist error", err);
    }
  };

  const handlePress = useCallback(
    async (val: string) => {
      if (val === "Hist") {
        router.push("/history");
        return;
      }
      if (val === "C") {
        setExpression("");
        setResult("");
        return;
      }
      if (val === "⌫") {
        // Delete/backspace
        setExpression((p) => p.slice(0, -1));
        return;
      }
      if (val === "=") {
        try {
          const value = evaluateExpression(expression);
          const formatted = String(value);
          setResult(formatted);
          await pushHistory(expression || formatted, formatted);
          setExpression(formatted); // allow chaining
        } catch (err: any) {
          Alert.alert("Error", err?.message ?? "Invalid expression");
        }
        return;
      }
      if (val === "±") {
        if (!expression) {
          setExpression("-");
          return;
        }
        const match = expression.match(/(-?\d+\.?\d*)$/);
        if (match) {
          const last = match[1];
          const toggled = last.startsWith("-") ? last.slice(1) : "-" + last;
          setExpression(expression.slice(0, -last.length) + toggled);
        } else {
          setExpression((p) => p + "-");
        }
        return;
      }
      if (val === "√") {
        setExpression((p) => p + "√(");
        return;
      }
      if (val === "²") {
        setExpression((p) => p + "²");
        return;
      }
      // default append: numbers, operators, %, parentheses, dot
      setExpression((p) => p + val);
    },
    [expression, router]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-2">
        <TouchableOpacity
          onPress={() => router.push("/history")}
          className="px-3 py-1 rounded-md bg-primary"
        >
          <Text className="text-white">History</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-between">
        <View className="px-4">
          <Display expression={expression} result={result} />
        </View>

        <ButtonPad onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
}
