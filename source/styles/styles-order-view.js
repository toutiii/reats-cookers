import { StyleSheet } from "react-native";

let styles_order_view;

export default styles_order_view = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button_container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    width: "95%",
  },
  orderview: {
    flex: 1,
    margin: "2%",
    aspectRatio: 5,
    alignItems: "center",
    flexDirection: "row",
  },
});
