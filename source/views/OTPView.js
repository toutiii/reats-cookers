import React, { useState } from "react";

import { Platform, Text, StyleSheet, TextInput, View } from "react-native";

import CustomButton from "../button/CustomButton";
import all_constants from "../constants";
import { callBackEnd } from "../api/callBackend";
import CustomAlert from "../components/CustomAlert";
import { setToken } from "../api/token";
import { CommonActions } from "@react-navigation/native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function OTPView({ ...props }) {
  const [OTPValue, setOTPValue] = useState(["", "", "", "", "", ""]);
  const [showAlert, setShowAlert] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [randomNumber, setRandomNumber] = useState(1);
  const [showResendOTPButton, setShowResendOTpButton] = useState(false);
  const [showCounterCircle, setShowCounterCircle] = useState(true);
  const [showResendOTPAlert, setShowResendOTPAlert] = useState(false);
  const [isResendOTPRequestFailed, setIsResendOTPRequestFailed] =
    useState(false);

  const OTPLength = 6;
  const OTPAskDelay = 30;

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleLogin = () => {
    // await setToken(result.token);
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "MainDrawerNavigator" }],
    });
    props.navigation.dispatch(resetAction);
  };

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
    if (value !== "" && value.length === OTPLength) {
      setOTPValue(("" + value).split(""));
    } else {
      const newOtp = [...OTPValue];
      newOtp[index] = value;
      setOTPValue(newOtp); // Move focus to the next box if the current one has a value
      if (value && index < newOtp.length - 1) {
        inputs[index + 1].focus();
      }
    }
  };

  const hideResendOTPButton = (result) => {
    if (result.ok) {
      setShowResendOTpButton(false);
      setShowCounterCircle(true);
    }
  };
  async function askNewOTP() {
    let data = new FormData();
    data.append("phone", props.route.params.item.phone);
    await sleep(1000);
    const result = await callBackEnd(
      data,
      "http://192.168.1.85:8000/api/v1/cookers/otp/ask/",
      "POST",
      (useFormData = true)
    );
    console.log(result);
    result.ok
      ? setIsResendOTPRequestFailed(false)
      : setIsResendOTPRequestFailed(true);

    hideResendOTPButton(result);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <CustomAlert
          show={showResendOTPAlert}
          title={all_constants.messages.otp.title.send_again_title}
          message={all_constants.messages.otp.message.send_again_message}
          confirmButtonColor={"green"}
          onConfirmPressed={() => {
            setShowResendOTPAlert(false);
            askNewOTP();
          }}
        />

        <CustomAlert
          show={isResendOTPRequestFailed}
          title={all_constants.messages.failed.title}
          confirmButtonColor={"red"}
          onConfirmPressed={() => {
            setIsResendOTPRequestFailed(false);
          }}
        />

        <CustomAlert
          show={showAlert}
          title={
            isRequestSuccessful
              ? all_constants.messages.success.title
              : all_constants.messages.failed.title
          }
          message={
            props.route.params.auth
              ? isRequestSuccessful
                ? all_constants.messages.success.login_message
                : ""
              : all_constants.messages.success.signup_message
          }
          confirmButtonColor={isRequestSuccessful ? "green" : "red"}
          onConfirmPressed={() => {
            setShowAlert(false);
            if (isRequestSuccessful) {
              if (props.route.params.auth) {
                handleLogin();
              } else {
                props.navigation.navigate("LoginForm");
              }
            }
          }}
        />
      </View>
      <View style={styles.container} key={randomNumber}>
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
            maxLength={index === 0 ? OTPLength : 1}
            autoFocus={index === 0 ? true : false}
            value={digit}
            ref={(input) => {
              inputs[index] = input;
            }}
          />
        ))}
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "15%",
          }}
        >
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

          <View style={{ height: 40 }}></View>

          <CustomButton
            label={all_constants.messages.clear}
            backgroundColor="darkgrey"
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            label_color="white"
            onPress={() => {
              setRandomNumber(Math.floor(Math.random() * 10));
              setOTPValue(["", "", "", "", "", ""]);
            }}
          />

          <View style={{ height: 40 }}></View>

          {showResendOTPButton && (
            <CustomButton
              label={all_constants.messages.send_again}
              backgroundColor="grey"
              height={50}
              border_width={3}
              border_radius={30}
              font_size={17}
              label_color="white"
              onPress={() => {
                setShowResendOTPAlert(true);
              }}
            />
          )}

          <View style={{ height: 40 }}></View>

          {showCounterCircle && (
            <CountdownCircleTimer
              isPlaying
              duration={OTPAskDelay}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setShowResendOTpButton(true);
                setShowCounterCircle(false);
                return { shouldRepeat: false };
              }}
            >
              {({ remainingTime }) => (
                <Text style={{ fontSize: 22 }}>{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          )}
        </View>
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
    marginTop: "15%",
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
