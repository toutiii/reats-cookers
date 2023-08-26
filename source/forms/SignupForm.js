import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
} from "../validators/global_validators";
import {
  checkEmailFormat,
  checkFormCoherence,
  checkNumericFormat,
  checkPasswordFormat,
  checkPostalCode,
} from "../validators/settingsform_validators";
import { callBackEnd } from "../api/callBackend";

export default function SignupForm({ ...props }) {
  const handleResult = async (result) => {
    if (result.ok) {
      props.navigation.goBack(null);
    } else {
      throw new Error("Failed.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Form
          action={callBackEnd}
          url={"http://10.0.2.2:8000/api/v1/cookers/"}
          method={"POST"}
          navigation={props.navigation}
          afterSubmit={handleResult}
          item={{}}
          fields={{
            email: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.email,
              placeholder: all_constants.placeholders.form.settings.email,
              validators: [checkValueIsDefined, checkEmailFormat],
              maxLength: all_constants.max_length.form.email,
            },
            password: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.signup_new_password,
              labelModal: true,
              labelModalText: all_constants.modal.form.settings.signup_password,
              placeholder:
                all_constants.placeholders.form.settings.signup_password,
              validators: [checkPasswordFormat],
              maxLength: all_constants.max_length.form.password,
            },
            password_confirmation: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label:
                all_constants.label.form.settings
                  .signup_new_password_confirmation,
              placeholder:
                all_constants.placeholders.form.settings
                  .signup_password_confirmation,
              validators: [checkPasswordFormat, checkFormCoherence],
              maxLength: all_constants.max_length.form.password,
            },
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
