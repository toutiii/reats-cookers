import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import { View } from "react-native";
import {
  checkValueIsDefined,
  checkValueNotContainsSpecialChar,
  valueIsValidCapacity,
  valueIsValidPrice,
} from "../validators/global_validators";
import { callBackEnd } from "../api/callBackend";
import { getCapacityUnits } from "../helpers/global_helpers";

export default function DrinkForm({ ...props }) {
  const handleResult = async (result) => {
    if (result.ok) {
      props.navigation.goBack(null);
    } else {
      throw new Error("Failed to update the drink.");
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
            drink_name: {
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
            drink_price: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              maxLength: all_constants.max_length.dish_form.dish_price,
              label: all_constants.label.form.dishes.price,
              placeholder: all_constants.placeholders.form.dishes.dish_price,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, valueIsValidPrice],
            },
            drink_bottle_capacity: {
              fieldIsMandatory: true,
              type: all_constants.field_type.textinput,
              maxLength:
                all_constants.max_length.drink_form.drink_bottle_capacity,
              label: all_constants.label.drinks.drink_bottle_capacity,
              placeholder:
                all_constants.placeholders.form.drinks.drink_bottle_capacity,
              keyboardNumeric: true,
              validators: [checkValueIsDefined, valueIsValidCapacity],
            },
            drink_bottle_capacity_unit: {
              fieldIsMandatory: true,
              type: all_constants.field_type.select,
              label: all_constants.label.drinks.drink_bottle_capacity_unit,
              placeholder:
                all_constants.placeholders.form.drinks
                  .drink_bottle_capacity_unit,
              validators: [checkValueIsDefined],
              selectValues: getCapacityUnits(),
            },
            drink_description: {
              type: all_constants.field_type.textarea,
              maxLength: all_constants.max_length.dish_form.dish_description,
              label: all_constants.label.form.dishes.description,
              placeholder:
                all_constants.placeholders.form.dishes.dish_description,
              validators: [checkValueNotContainsSpecialChar],
            },
            photo: {
              fieldIsMandatory: false,
              type: all_constants.field_type.image,
              label: all_constants.label.form.dishes.image,
            },
            drink_country: {
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
