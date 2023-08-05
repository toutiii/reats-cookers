import React from "react";
import { View } from "react-native";
import Form from "./Form";
import all_constants from "../constants";
import { checkValueIsDefined } from "../validators/global_validators";
import { checkEmailFormat } from "../validators/settingsform_validators";
import { callBackEnd } from "../api/callBackend";

export default function ForgottenPasswordForm({ ...props }) {
  const handleResult = async (result) => {
    if (!result.ok) {
      throw new Error("Failed.");
    }
  };
  return (
    <View style={{ flex: 1, marginTop: "25%" }}>
      <View style={{ flex: 1 }}>
        <Form
          action={callBackEnd}
          url={all_constants.uri.api.mock}
          method={"POST"}
          navigation={props.navigation}
          afterSubmit={handleResult}
          reset_password={true}
          item={{}}
          fields={{
            email: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.login.email,
              placeholder: all_constants.placeholders.form.login.email,
              validators: [checkValueIsDefined, checkEmailFormat],
              maxLength: 100,
            },
          }}
        />
      </View>
    </View>
  );
}
