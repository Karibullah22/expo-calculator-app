// ButtonPad.tsx
import React, { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  onPress: (value: string) => void;
};

const ROWS: string[][] = [
  ["C", "(", ")", "÷", "⌫"],
  ["7", "8", "9", "×", "^"], // ◀️ Added Exponent (^)
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="],
  ["%", "√", "²", "Hist"],
];

const ButtonPad: React.FC<Props> = ({ onPress }) => {
  const renderButton = useCallback(
    (label: string) => {
      const variant =
        label === "="
          ? "bg-black/80"
          : ["÷", "×", "-", "+", "−", "^"].includes(label)
          ? "bg-gray-100" // ◀️ Added '^' to this list
          : label === "C"
          ? "bg-red-400"
          : label === "⌫"
          ? "bg-yellow-300" // ◀️ Added style for delete key
          : "bg-white";

      const textColor =
        variant === "bg-black/80" || variant === "bg-red-400"
          ? "text-white"
          : "text-black";

      return (
        <Pressable
          key={label}
          onPress={() => onPress(label)}
          className={`flex-1 m-1 rounded-2xl items-center justify-center py-4 ${variant}`}
          android_ripple={{ color: "#00000010" }}
        >
          <Text className={`text-xl font-medium ${textColor}`}>{label}</Text>
        </Pressable>
      );
    },
    [onPress]
  );

  return (
    <View className="w-full px-3 pb-6">
      {ROWS.map((row, idx) => (
        <View key={idx} className="flex-row">
          {row.map((label) => renderButton(label))}
        </View>
      ))}
    </View>
  );
};

export default React.memo(ButtonPad);
