import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueNotContainsSpecialChar,
  checkValueIsDefined,
  valueIsValidPrice,
} from "../validators/global_validators";
import { checkMenuCoherence } from "../validators/menuformview_validators";
import { callBackEnd } from "../api/fetch";

export default function MenuFormView({ ...props }) {
  const handleResult = async (result) => {
    if (result.ok) {
      props.navigation.goBack(null);
    } else {
      throw new Error("Failed to update the dish.");
    }
  };

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
          third_button_label={all_constants.label.dishes.disable_dish}
          fourth_button_label={all_constants.label.dishes.remove_dish}
          fields={{
            menu_name: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.menu.name,
              placeholder: all_constants.placeholders.form.menu.menu_name,
              validators: [checkValueNotContainsSpecialChar],
              maxLength: 50,
            },
            menu_starter: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.menu.starter,
              placeholder: all_constants.placeholders.form.menu.menu_starter,
              validators: [checkValueNotContainsSpecialChar],
              maxLength: 50,
            },
            menu_main_dish: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.menu.main_dish,
              placeholder: all_constants.placeholders.form.menu.menu_main_dish,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
              maxLength: 50,
            },
            menu_dessert: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.menu.dessert,
              placeholder: all_constants.placeholders.form.menu.menu_dessert,
              validators: [checkValueNotContainsSpecialChar],
              maxLength: 50,
            },
            menu_drink: {
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.menu.drink,
              placeholder: all_constants.placeholders.form.menu.menu_drink,
              validators: [checkValueNotContainsSpecialChar],
              maxLength: 50,
            },
            menu_price: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              label: all_constants.label.form.menu.price,
              placeholder: all_constants.placeholders.form.menu.menu_price,
              keyboardNumeric: true,
              validators: [
                checkValueIsDefined,
                valueIsValidPrice,
                checkMenuCoherence,
              ],
              maxLength: 5,
            },
          }}
        />
      </View>
    </View>
  );
}
