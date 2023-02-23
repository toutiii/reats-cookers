import React from "react";
import { Text, View } from "react-native";
import styles_menu from "../styles/styles-menu";
import all_constants from "../constants";
import HorizontalLine from "./HorizontalLine";

export default function Menu({ ...props }) {
  const menuFields = [
    "menu_starter",
    "menu_main_dish",
    "menu_dessert",
    "menu_price",
    "menu_drink",
  ];
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, color: "black" }}>
          {props.menu_name
            ? all_constants.menu.label.menu_name + " " + props.menu_name
            : all_constants.menu.label.menu_name}
        </Text>
        <HorizontalLine />
      </View>
      <View style={{ flex: 5 }}>
        {Object.keys(props).map((key) => {
          if (menuFields.includes(key) && props[key] !== null) {
            return (
              <View key={key} style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles_menu.dish_label}>
                    {all_constants.menu.label[key]}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={styles_menu.menu_element}>
                    {props[key]}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
}
