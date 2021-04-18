import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_dish_infos from "../api/update_dish_infos";
import {validateDescriptionLength, validateNumberType, validateTextLength} from "../validators/validate_dishformview"


export default function DishFormView ({...props}){
    const handleResult = async (result) => {
        if (result.ok) {
            props.navigation.goBack(null);
        } else {
            throw new Error('Failed to update the dish.');
        }
    };

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 2, marginTop: '10%'}}>
                <Form
                    action={update_dish_infos}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    item={props.route.params.item}
                    third_button_label={all_constants.label.dishes.disable_dish}
                    fourth_button_label={all_constants.label.dishes.remove_dish}
                    fields={{
                        dish_category: {
                            type: all_constants.field_type.select,
                            label: all_constants.label.form.dishes.category,
                        },
                        dish_name: {
                            type: all_constants.field_type.textinput,
                            maxLength: 30,
                            label: all_constants.label.form.dishes.name,
                            validators: [validateTextLength]
                        },
                        dish_photo: {
                            type: all_constants.field_type.image,
                            label: all_constants.label.form.dishes.image,
                        },
                        dish_price: {
                            type: all_constants.field_type.textinput,
                            maxLength: 5,
                            label: all_constants.label.form.dishes.price,
                            validators: [validateNumberType]
                        },
                        dish_description: {
                            type: all_constants.field_type.textarea,
                            maxLength: 200,
                            label: all_constants.label.form.dishes.description,
                            validators: [validateDescriptionLength]
                        },
                        dish_country: {
                            type: all_constants.field_type.textinput,
                            maxLength: 200,
                            label: all_constants.label.form.dishes.country,
                            validators: [validateDescriptionLength]
                        },
                    }}
                />
            </View>
        </View>
    )
}