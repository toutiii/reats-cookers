import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_menu_infos from "../api/update_menu_infos";


export default function MenuFormView ({...props}){
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
                    action={update_menu_infos}
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
                            validators: [],
                            maxLength: 30,
                        },
                        menu_starter: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.menu.starter,
                            placeholder: all_constants.placeholders.form.menu.menu_starter,
                            validators: [],
                            maxLength: 30,
                        },
                        menu_main_dish: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.menu.main_dish,
                            placeholder: all_constants.placeholders.form.menu.menu_main_dish,
                            validators: [],
                            maxLength: 30,
                        },
                        menu_dessert: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.menu.dessert,
                            placeholder: all_constants.placeholders.form.menu.menu_dessert,
                            validators: [],
                            maxLength: 30,
                        },
                        menu_drink: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.menu.drink,
                            placeholder: all_constants.placeholders.form.menu.menu_drink,
                            validators: [],
                            maxLength: 30,
                        },
                        menu_price: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.menu.price,
                            placeholder: all_constants.placeholders.form.menu.menu_price,
                            validators: [],
                            maxLength: 5,
                        },
                    }}
                />
            </View>
        </View>
    )
}