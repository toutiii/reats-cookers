import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
} from "../validators/global_validators";
import {
  checkNumericFormat,
  checkPostalCode,
} from "../validators/settingsform_validators";
import { callBackendWithFormDataForCookers } from "../api/callBackend";
import CustomAlert from "../components/CustomAlert";

export default function SignupForm({ ...props }) {
  const [showAlert, setShowAlert] = React.useState(false);
  const [isRequestOK, setIsRequestOK] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const handleResult = (isRequestSuccessful, itemObject) => {
    setIsRequestOK(isRequestSuccessful);
    setItem(itemObject);
    setShowAlert(true);
  };

  const onConfirmPressedRequestSuccess = () => {
    setShowAlert(false);
    props.navigation.navigate("OTPView", { item: item });
  };

  const onConfirmPressedRequestFailed = () => {
    setShowAlert(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <CustomAlert
          show={showAlert}
          title={
            isRequestOK
              ? all_constants.messages.success.title
              : all_constants.messages.failed.title
          }
          message={
            isRequestOK && all_constants.messages.success.otp_message_signup
          }
          confirmButtonColor={isRequestOK ? "green" : "red"}
          onConfirmPressed={() => {
            isRequestOK
              ? onConfirmPressedRequestSuccess()
              : onConfirmPressedRequestFailed();
          }}
        />
      </View>

      <View style={{ flex: 2 }}>
        <Form
          action={callBackendWithFormDataForCookers}
          url={"http://192.168.1.85:8000/api/v1/cookers/"}
          method={"POST"}
          navigation={props.navigation}
          afterSubmit={handleResult}
          item={{}}
          fields={{
            siret: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.siret,
              placeholder: all_constants.placeholders.form.settings.siret,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: all_constants.max_length.form.siret,
            },
            firstname: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.firstname,
              placeholder: all_constants.placeholders.form.settings.firstname,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.firstname,
            },
            lastname: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.lastname,
              placeholder: all_constants.placeholders.form.settings.lastname,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.lastname,
            },
            phone: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.phone,
              placeholder: all_constants.placeholders.form.settings.phone,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: all_constants.max_length.form.phone,
            },
            street_number: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.street_number,
              placeholder:
                all_constants.placeholders.form.settings.street_number,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.street_number,
            },
            street_name: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.street_name,
              placeholder: all_constants.placeholders.form.settings.street_name,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.street_name,
            },
            address_complement: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.address_complement,
              placeholder:
                all_constants.placeholders.form.settings.address_complement,
              validators: [checkValueNotContainsSpecialChar],
              maxLength: all_constants.max_length.form.address_complement,
            },
            postal_code: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.postal_code,
              placeholder: all_constants.placeholders.form.settings.postal_code,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkPostalCode],
              maxLength: all_constants.max_length.form.postal_code,
            },
            town: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.town,
              placeholder: all_constants.placeholders.form.settings.town,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: all_constants.max_length.form.town,
            },
          }}
        />
      </View>
    </View>
  );
}
