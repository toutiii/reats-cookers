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
import { callBackendWithFormDataForDrinks } from "../../api/callBackend";
import { getCapacityUnits } from "../helpers/global_helpers";
import { getCountries } from "../helpers/global_helpers";
import { apiBaseUrl, port } from "../../env";

export default function DrinkForm({ ...props }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2, marginTop: "10%" }}>
                <Form
                    action={callBackendWithFormDataForDrinks}
                    url={`${apiBaseUrl}:${port}/api/v1/drinks/`}
                    method={"POST"}
                    navigation={props.navigation}
                    refreshDataStateChanger={props.route.params.refreshDataStateChanger}
                    item={props.route.params.item}
                    isNewItem={
                        "new_item" in props.route.params
                            ? props.route.params.new_item
                            : false
                    }
                    third_button_label={all_constants.label.dishes.disable_dish}
                    third_bis_button_label={all_constants.label.dishes.enable_dish}
                    fourth_button_label={all_constants.label.dishes.remove_dish}
                    fields={{
                        name: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: all_constants.max_length.dish_form.dish_name,
                            label: all_constants.label.form.dishes.name,
                            placeholder: all_constants.placeholders.form.dishes.dish_name,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar
                            ],
                        },
                        photo: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.image,
                            label: all_constants.label.form.dishes.image,
                            validators: [
                                checkValueIsDefined
                            ],
                        },
                        price: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: all_constants.max_length.dish_form.dish_price,
                            label: all_constants.label.form.dishes.price,
                            placeholder: all_constants.placeholders.form.dishes.dish_price,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                valueIsValidPrice
                            ],
                        },
                        capacity: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: all_constants.max_length.drink_form.drink_bottle_capacity,
                            label: all_constants.label.drinks.drink_bottle_capacity,
                            placeholder:
                                all_constants.placeholders.form.drinks.drink_bottle_capacity,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                valueIsValidCapacity
                            ],
                        },
                        unit: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.select,
                            label: all_constants.label.drinks.drink_bottle_capacity_unit,
                            placeholder:
                                all_constants.placeholders.form.drinks.drink_bottle_capacity_unit,
                            validators: [
                                checkValueIsDefined
                            ],
                            selectValues: getCapacityUnits(),
                        },
                        country: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.autocomplete,
                            maxLength: all_constants.max_length.dish_form.dish_country,
                            label: all_constants.label.form.dishes.country,
                            placeholder: all_constants.placeholders.form.dishes.dish_country,
                            validators: [
                                checkValueNotContainsSpecialChar
                            ],
                            autoCompleteValues: getCountries(),
                        },
                        description: {
                            type: all_constants.field_type.textarea,
                            maxLength: all_constants.max_length.dish_form.dish_description,
                            label: all_constants.label.form.dishes.description,
                            placeholder: all_constants.placeholders.form.dishes.dish_description,
                            validators: [
                                checkValueNotContainsSpecialChar
                            ],
                        },
                    }}
                />
            </View>
        </View>
    );
}
