import React, { useState } from "react";

import { TextInput, View } from "react-native";

import CustomButton from "../button/CustomButton";
import all_constants from "../constants";

export default function OTPView({ ...props }) {
  const [OTPValue, setOTPValue] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TextInput
          backgroundColor="darkgrey"
          height={40}
          onChangeText={(value) => {
            setOTPValue(value);
          }}
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomButton
          label={all_constants.messages.submit}
          backgroundColor="green"
          height={50}
          border_width={3}
          border_radius={30}
          font_size={17}
          label_color="white"
          onPress={() => {
            console.log("SEND OTP");
          }}
        />
      </View>
    </View>
  );
}
