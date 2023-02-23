import React, { Component } from "react";
import { View } from "react-native";
import CustomButton from "../button/CustomButton";
import all_constants from "../constants";

export default class AddView extends Component {
  constructor(props) {
    super(props);
  }
  onSubmitNavigateToScreen = (screenName) => {
    this.props.navigation.navigate(screenName, { item: {} });
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: "50%" }}>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={all_constants.label.dishes.add_dish}
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            backgroundColor={"tomato"}
            label_color={"white"}
            onPress={() => {
              this.onSubmitNavigateToScreen("DishFormView");
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={all_constants.label.dishes.add_menu}
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            backgroundColor={"tomato"}
            label_color={"white"}
            onPress={() => {
              this.onSubmitNavigateToScreen("MenuFormView");
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomButton
            label={all_constants.label.offer.add_offer}
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            backgroundColor={"tomato"}
            label_color={"white"}
            onPress={() => {
              this.onSubmitNavigateToScreen("OfferFormView");
            }}
          />
        </View>
      </View>
    );
  }
}
