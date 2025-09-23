import { Text, View } from "react-native";

interface Props {
  expression: string;
  result: string;
}

export default function Display({ expression, result }: Props) {
  return (
    <View className="mb-6 flex-1 justify-end px-4">
      {/* Expression on top */}
      <Text
        className="text-right text-black text-3xl"
        numberOfLines={1}
        ellipsizeMode="head"
      >
        {expression}
      </Text>

      {/* Result below in orange */}
      <Text
        className="text-right text-orange-400 text-5xl font-bold mt-2"
        numberOfLines={1}
        ellipsizeMode="head"
      >
        {result}
      </Text>
    </View>
  );
}
