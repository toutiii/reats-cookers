import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
} from "../validators/global_validators";
import { checkNumericFormat } from "../validators/settingsform_validators";
import { callBackendWithFormDataForCookers } from "../api/callBackend";
import { checkMaxDishesNumber } from "../validators/settingsform_validators";

export default function SettingsPersonalInformationForm({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, marginTop: "10%" }}>
        <Form
          action={callBackendWithFormDataForCookers}
          url={"http://192.168.1.82:8000/api/v1/cookers/"}
          method={"PATCH"}
          navigation={props.navigation}
          refreshDataStateChanger={props.route.params.refreshDataStateChanger}
          item={props.route.params.item}
          fields={{
            photo: {
              fieldIsMandatory: true,
              type: all_constants.field_type.image,
              label: all_constants.label.form.settings.image,
              validators: [checkValueIsDefined],
            },
            siret: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.siret,
              placeholder: all_constants.placeholders.form.settings.siret,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, checkNumericFormat],
              maxLength: all_constants.max_length.form.siret,
              isReadOnly: true,
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
              isReadOnly: true,
            },

            max_order_number: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.settings.max_order_number,
              keyboardNumeric: true,
              labelModal: true,
              labelModalText:
                all_constants.modal.form.settings.max_order_number,
              placeholder:
                all_constants.placeholders.form.settings.max_order_number,
              validators: [checkValueIsDefined, checkMaxDishesNumber],
              maxLength: all_constants.max_length.order_form.max_order_number,
            },
          }}
        />
      </View>
    </View>
  );
}
