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
import {valueIsValidQuantity} from "../validators/offerformview_validators";


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
            <View style={{flex: 2, marginTop: '10%'}}>
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
                            isReadOnly: !!props.route.params.item['dish_name'],
                            type: all_constants.field_type.textinput,
                            maxLength: 50,
                            label: all_constants.label.form.special_offer.name,
                            placeholder: all_constants.placeholders.form.special_offer.name,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar
                            ]
                        },
                        offer_quantity: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: 5,
                            label: all_constants.label.form.special_offer.quantity,
                            placeholder: all_constants.placeholders.form.special_offer.quantity,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                valueIsValidQuantity
                            ]
                        },
                        offer_price: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            maxLength: 5,
                            label: all_constants.label.form.special_offer.price,
                            placeholder: all_constants.placeholders.form.special_offer.price,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                valueIsValidPrice
                            ]
                        },
                        offer_rate: {
                            type: all_constants.field_type.textinput,
                            maxLength: 5,
                            label: all_constants.label.form.special_offer.rate,
                            placeholder: all_constants.placeholders.form.special_offer.rate,
                            isReadOnly: true
                        },
                    }}
                />
            </View>
        </View>
    )
}