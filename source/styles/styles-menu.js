import { StyleSheet } from "react-native";

let styles_menu;

export default styles_menu = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  menu_button_container: {
    flex: 1,
    aspectRatio: 16 / 9,
    paddingTop: "3%",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  dish_label: {
    fontSize: 16,
    color: "tomato",
  },
  menu_element: {
    fontSize: 16,
  },
});
