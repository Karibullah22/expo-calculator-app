import { Text, View } from "react-native";

interface Props {
  expression: string;
  result: string;
}

export default function Display({ expression, result }: Props) {
  return (
    <View className="mb-6">
      {/* Expression on top */}
      <Text
        className="text-right text-gray-400 text-xl"
        numberOfLines={1}
        ellipsizeMode="head"
      >
        {expression}
      </Text>

      {/* Result clearly below */}
      <Text
        className="text-right text-white text-5xl font-bold mt-2"
        numberOfLines={1}
        ellipsizeMode="head"
      >
        {result}
      </Text>
    </View>
  );
}
