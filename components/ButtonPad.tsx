import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress: (val: string) => void;
}

export default function ButtonPad({ onPress }: Props) {
  const buttons = [
    ["C", "(", ")", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "%", "="],
  ];

  return (
    <View className="mt-6">
      {buttons.map((row, i) => (
        <View key={i} className="flex-row justify-between mb-3">
          {row.map((btn) => (
            <TouchableOpacity
              key={btn}
              onPress={() => onPress(btn)}
              className="flex-1 mx-1 bg-gray-800 rounded-full py-5"
            >
              <Text className="text-center text-white text-lg font-bold">
                {btn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
