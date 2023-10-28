import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
} from "../validators/global_validators";
import { checkPostalCode } from "../validators/settingsform_validators";
import { callBackendWithFormDataForCookers } from "../api/callBackend";

export default function SettingsAddressForm({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, marginTop: "10%" }}>
        <Form
          action={callBackendWithFormDataForCookers}
          url={"http://192.168.1.85:8000/api/v1/cookers/"}
          method={"PATCH"}
          navigation={props.navigation}
          refreshDataStateChanger={props.route.params.refreshDataStateChanger}
          item={props.route.params.item}
          fields={{
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
