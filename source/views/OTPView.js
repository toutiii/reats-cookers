import React, { useState } from "react";

import { TextInput, View } from "react-native";

import CustomButton from "../button/CustomButton";
import all_constants from "../constants";
import { callBackEnd } from "../api/callBackend";
import CustomAlert from "../components/CustomAlert";

export default function OTPView({ ...props }) {
  const [OTPValue, setOTPValue] = useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = React.useState(false);

  async function verifyOTP() {
    let data = new FormData();
    data.append("otp", OTPValue);
    data.append("phone", props.route.params.item.phone);

    const result = await callBackEnd(
      data,
      "http://192.168.1.85:8000/api/v1/cookers/otp-verify/",
      "POST",
      (useFormData = true)
    );
    console.log(result);
    setIsRequestSuccessful(result.ok);
    setShowAlert(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <CustomAlert
          show={showAlert}
          title={
            isRequestSuccessful
              ? all_constants.messages.success.title
              : all_constants.messages.failed.title
          }
          message={
            isRequestSuccessful && all_constants.messages.success.message
          }
          confirmButtonColor={isRequestSuccessful ? "green" : "red"}
          onConfirmPressed={() => {
            setShowAlert(false);
            if (isRequestSuccessful) {
              props.navigation.navigate("LoginForm");
            }
          }}
        />
      </View>
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
          keyboardType="numeric"
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
            verifyOTP();
          }}
        />
      </View>
    </View>
  );
}
