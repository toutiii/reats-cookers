import React, { useState } from "react";

import { Platform, StyleSheet, TextInput, View } from "react-native";

import CustomButton from "../button/CustomButton";
import all_constants from "../constants";
import { callBackEnd } from "../api/callBackend";
import CustomAlert from "../components/CustomAlert";

export default function OTPView({ ...props }) {
  const [OTPValue, setOTPValue] = useState(["", "", "", "", "", ""]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = React.useState(false);

  async function verifyOTP() {
    let data = new FormData();
    data.append("otp", OTPValue.join(""));
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

  const inputs = [];

  const handleOtpChange = (value, index) => {
    const newOtp = [...OTPValue];
    newOtp[index] = value;
    setOTPValue(newOtp); // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    }
    if (value === "" && index >= 1) {
      inputs[index - 1].focus();
    }
  };

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
      <View style={styles.container}>
        {OTPValue.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.box}
            autoComplete={
              Platform.OS === "android" && index === 0 ? "sms-otp" : "off"
            }
            textContentType={
              Platform.OS === "ios" && index === 0 ? "oneTimeCode" : "none"
            }
            height={40}
            onChangeText={(value) => handleOtpChange(value, index)}
            keyboardType="numeric"
            cursorColor="green"
            textAlign="center"
            maxLength={1}
            value={digit}
            autoFocus={index === 0 ? true : false}
            ref={(input) => {
              inputs[index] = input;
            }}
          />
        ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderWidth: 2,
    borderColor: "black",
    width: 35,
    height: 50,
    margin: "3%",
    textAlign: "center",
    fontSize: 20,
  },
});
