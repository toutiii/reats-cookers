import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import all_constants from "../constants";
import styles_settings from "../styles/styles-settings";
import CustomButton from "../button/CustomButton";
import { getUserSettings } from "../helpers/settings_helpers";
import Setting from "../components/Setting";
import styles_form from "../styles/styles-form";
import HorizontalLine from "../components/HorizontalLine";

export default class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.userInfosObject = getUserSettings();
  }

  render() {
    return (
      <View style={styles_settings.container}>
        <View style={{ flex: 7, width: "95%" }}>
          <ScrollView>
            {Object.keys(this.userInfosObject).map((key) => {
              return (
                <View key={key} style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ fontSize: 22 }}>
                    {
                      all_constants.label.settings.section_title[
                        this.userInfosObject[key]["title"]
                      ]
                    }
                  </Text>
                  <HorizontalLine line_width={2} />
                  {Object.keys(this.userInfosObject[key]["data"]).map(
                    (data_key) => {
                      return (
                        <Setting
                          key={data_key}
                          label={all_constants.label.settings[data_key]}
                          value={this.userInfosObject[key]["data"][data_key]}
                        />
                      );
                    }
                  )}
                  <View style={{ flex: 2 }}>
                    <View style={styles_form.submit_button}>
                      <CustomButton
                        label={all_constants.label.settings.change_settings}
                        height={40}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        backgroundColor={"tomato"}
                        label_color="white"
                        onPress={() => {
                          if (key.includes("credential")) {
                            this.props.navigation.navigate(
                              "SettingsCredentialsForm",
                              { item: this.userInfosObject[key]["data"] }
                            );
                          } else if (key.includes("personal")) {
                            this.props.navigation.navigate(
                              "SettingsPersonalInformationForm",
                              { item: this.userInfosObject[key]["data"] }
                            );
                          } else if (key.includes("address")) {
                            this.props.navigation.navigate(
                              "SettingsAddressForm",
                              { item: this.userInfosObject[key]["data"] }
                            );
                          } else {
                            this.props.navigation.navigate(
                              "SettingsOrderInformationForm",
                              { item: this.userInfosObject[key]["data"] }
                            );
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
