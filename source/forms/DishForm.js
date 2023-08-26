import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
  valueIsValidPrice,
} from "../validators/global_validators";
import { callBackEnd } from "../api/callBackend";

export default function DishForm({ ...props }) {
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
          is_new_item={
            props.route.params.hasOwnProperty("new_item")
              ? props.route.params.new_item
              : false
          }
          third_button_label={all_constants.label.dishes.disable_dish}
          fourth_button_label={all_constants.label.dishes.remove_dish}
          fields={{
            dish_category: {
              fieldIsMandatory: true,
              type: all_constants.field_type.select,
              label: all_constants.label.form.dishes.category,
              placeholder: all_constants.placeholders.form.dishes.dish_category,
              validators: [checkValueIsDefined],
            },
            dish_name: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              maxLength: all_constants.max_length.dish_form.dish_name,
              label: all_constants.label.form.dishes.name,
              placeholder: all_constants.placeholders.form.dishes.dish_name,
              validators: [
                checkValueIsDefined,
                checkValueNotContainsSpecialChar,
              ],
            },
            photo: {
              fieldIsMandatory: true,
              type: all_constants.field_type.image,
              label: all_constants.label.form.dishes.image,
              validators: [checkValueIsDefined],
            },
            dish_price: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              maxLength: all_constants.max_length.dish_form.dish_price,
              label: all_constants.label.form.dishes.price,
              placeholder: all_constants.placeholders.form.dishes.dish_price,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, valueIsValidPrice],
            },
            dish_description: {
              type: all_constants.field_type.textarea,
              maxLength: all_constants.max_length.dish_form.dish_description,
              label: all_constants.label.form.dishes.description,
              placeholder:
                all_constants.placeholders.form.dishes.dish_description,
              validators: [checkValueNotContainsSpecialChar],
            },
            dish_country: {
              type: all_constants.field_type.textinput,
              maxLength: all_constants.max_length.dish_form.dish_country,
              label: all_constants.label.form.dishes.country,
              placeholder: all_constants.placeholders.form.dishes.dish_country,
              validators: [checkValueNotContainsSpecialChar],
            },
          }}
        />
      </View>
    </View>
  );
}
