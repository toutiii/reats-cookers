import { Component } from "react";
import { Image, Switch, Text, View } from "react-native";
import CustomButton from "../button/CustomButton";
import styles_home_view from "../styles/styles-home-view";
import all_constants from "../constants";

export default class LogoutAndParametersButtonsView extends Component {
  render() {
    return (
      <View style={styles_home_view.button_container}>
        <View style={{ flex: 1, padding: "7%" }}>
          <CustomButton
            label={all_constants.messages.logout}
            backgroundColor="red"
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            label_color="white"
            onPress={() => {
              this.setState({ willLogout: true });
              this.setState({ showAlert: true });
            }}
          />
        </View>
        <View style={{ flex: 1, padding: "11%" }}>
          <CustomButton
            label={all_constants.messages.settings}
            backgroundColor="grey"
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            label_color="white"
            onPress={() => {
              this.onPressNavigateToTab("Settings");
            }}
          />
        </View>
      </View>
    );
  }
}
