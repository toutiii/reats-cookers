import { Image, Text, View } from "react-native";
import styles_dish from "../styles/styles-dish";
import all_constants from "../constants";
import React from "react";

export default function Dish({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5 }}>
        <View style={styles_dish.dish_name}>
          <Text numberOfLines={1} style={{ fontSize: 20 }}>
            {" "}
            {props.dish_name}{" "}
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <Image
            source={{
              uri: props.dish_photo,
            }}
            style={{ flex: 1 }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles_dish.dish_price}>
              <Text style={{ fontSize: 20 }}> {props.dish_price} </Text>
            </View>
            <View style={styles_dish.dish_rating}>
              <Image
                source={{ uri: all_constants.uri.rating_star }}
                style={styles_dish.rating_star}
              />
              <Text style={{ fontSize: 14 }}> {props.dish_rating} </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
