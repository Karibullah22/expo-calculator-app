import { Text, View } from "react-native";

interface Props {
  input: string;
  result: string;
}

export default function Display({ input, result }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-right text-gray-400 text-lg">{input}</Text>
      <Text className="text-right text-white text-3xl font-bold">{result}</Text>
    </View>
  );
}
