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
import { callBackEnd } from "../api/fetch";

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
          url={all_constants.uri.api.mock}
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
              maxLength: 100,
            },
            user_settings_new_password: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.new_password,
              labelModal: true,
              labelModalText: all_constants.modal.form.settings.signup_password,
              placeholder:
                all_constants.placeholders.form.settings
                  .user_settings_new_password,
              validators: [checkPasswordFormat],
              maxLength: 12,
            },
            user_settings_new_password_confirmation: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label:
                all_constants.label.form.settings.new_password_confirmation,
              placeholder:
                all_constants.placeholders.form.settings
                  .user_settings_new_password_confirmation,
              validators: [checkPasswordFormat, checkFormCoherence],
              maxLength: 12,
            },
            siret: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.siret,
              placeholder: all_constants.placeholders.form.settings.siret,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: 14,
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
              maxLength: 50,
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
              maxLength: 50,
            },
            phone: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.phone,
              placeholder: all_constants.placeholders.form.settings.phone,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: 10,
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
              maxLength: 20,
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
              maxLength: 100,
            },
            address_complement: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.address_complement,
              placeholder:
                all_constants.placeholders.form.settings.address_complement,
              validators: [checkValueNotContainsSpecialChar],
              maxLength: 100,
            },
            postal_code: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.postal_code,
              placeholder: all_constants.placeholders.form.settings.postal_code,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkPostalCode],
              maxLength: 5,
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
              maxLength: 100,
            },
          }}
        />
      </View>
    </View>
  );
}
