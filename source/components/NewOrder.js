import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
export default function NewOrder() {
  return (
    <View
      style={{
        flex: 1,
        borderColor: "purple",
        borderWidth: 4,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderColor: "red",
          borderWidth: 2,
          flex: 1,
          margin: "1%",
          aspectRatio: 1,
        }}
      />
      <View
        style={{
          borderColor: "green",
          borderWidth: 2,
          borderRadius: 20,
          flex: 2,
          margin: "1%",
          aspectRatio: 2,
        }}
      />
    </View>
  );
}
