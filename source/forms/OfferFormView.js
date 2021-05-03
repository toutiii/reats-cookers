import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_offer_infos from "../api/update_offer_infos";
import {
    checkValueIsDefined,
    checkValueNotContainsSpecialChar,
    valueIsValidPrice
} from "../validators/global_validators";


export default function OfferFormView ({...props}){
    const handleResult = async (result) => {
        if (result.ok) {
            props.navigation.goBack(null);
        } else {
            throw new Error('Failed to update the offer.');
        }
    };

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 2}}>
                <Form
                    action={update_offer_infos}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    item={props.route.params.item}
                    third_button_label={all_constants.label.dishes.disable_dish}
                    fourth_button_label={all_constants.label.dishes.remove_dish}
                    fields={{
                        dish_name: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: 50,
                            label: all_constants.label.form.dishes.name,
                            placeholder: all_constants.placeholders.form.dishes.dish_name,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar
                            ]
                        },
                        dish_price: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: 5,
                            label: all_constants.label.form.dishes.price,
                            placeholder: all_constants.placeholders.form.dishes.dish_price,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                valueIsValidPrice
                            ]
                        },
                    }}
                />
            </View>
        </View>
    )
}