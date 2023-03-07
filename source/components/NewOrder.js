import { View } from "react-native";
import { Divider } from "react-native-paper";
import all_constants from "../constants";
export default function NewOrder({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: "8%",
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
      <Divider />
    </View>
  );
}
