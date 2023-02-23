import { Image, Text, TouchableHighlight, View } from "react-native";
import styles from "../styles/styles";
import React from "react";
import styles_home_view from "../styles/styles-home-view";
import all_constants from "../constants";

export default function CustomImageButton({ label, ...props }) {
  return (
    <TouchableHighlight
      {...props}
      onPress={props.onPress}
      style={[styles_home_view.home_button]}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: props.uri }} style={{ height: 30, width: 30 }} />
      </View>
    </TouchableHighlight>
  );
}
