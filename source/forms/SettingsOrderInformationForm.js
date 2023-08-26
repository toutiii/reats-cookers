import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import { getDaysOfWeek } from "../helpers/global_helpers";
import { checkValueIsDefined } from "../validators/global_validators";
import { checkMaxDishesNumber } from "../validators/settingsform_validators";
import { callBackEnd } from "../api/callBackend";

export default function SettingsOrderInformationForm({ ...props }) {
  const handleResult = async (result) => {
    if (result.ok) {
      props.navigation.goBack(null);
    } else {
      throw new Error("Failed.");
    }
  };

  function getIndexOfDays(fieldName) {
    const daysObject = getDaysOfWeek();
    let days = [];
    let indexOfDays = [];
    daysObject.forEach((keyObject) => {
      days.push(keyObject.itemDescription);
    });
    if (
      props.route.params.item[fieldName] &&
      props.route.params.item[fieldName].length !== 0
    ) {
      const daysFromBackend = props.route.params.item[fieldName].split(", ");
      daysFromBackend.forEach((day) => {
        indexOfDays.push(days.indexOf(day) + 1);
      });
    }
    return indexOfDays;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, marginTop: "10%" }}>
        <Form
          action={callBackEnd}
          url={all_constants.uri.api.mock}
          method={"POST"}
          navigation={props.navigation}
          afterSubmit={handleResult}
          item={props.route.params.item}
          fields={{
            order_days: {
              fieldIsMandatory: true,
              type: all_constants.field_type.select_picker,
              label: all_constants.label.form.settings.order_days,
              labelModal: true,
              labelModalText: all_constants.modal.form.settings.order_days,
              placeholder: all_constants.placeholders.form.settings.order_days,
              validators: [checkValueIsDefined],
              checkedItems: getIndexOfDays("order_days"), // Will be used by PickerCheckBox in FormField
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
