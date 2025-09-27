// components/Display.tsx
import { StyleSheet, Text, View } from "react-native";

interface Props {
  expression: string;
  result: string;
}

export default function Display({ expression, result }: Props) {
  return (
    <View style={styles.container}>
      {/* Expression on top */}
      <Text style={styles.expression}>{expression || ""}</Text>

      {/* Result below */}
      <Text style={styles.result}>{result || ""}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    marginBottom: 4,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  expression: {
    textAlign: "right",
    color: "#000",
    fontSize: 50,
    fontWeight: "400",
  },
  result: {
    textAlign: "right",
    color: "orange",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 8,
  },
});
