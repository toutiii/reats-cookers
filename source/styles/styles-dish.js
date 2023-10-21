import { StyleSheet } from "react-native";
import React from "react";

let styles_dish;
export default styles_dish = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  dish_button_container: {
    flex: 1,
    aspectRatio: 16 / 9,
    paddingTop: "3%",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  dish_infos: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "5%",
  },
  dish_price: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  dish_name: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dish_rating: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rating_star: {
    width: 20,
    height: 20,
  },
});
