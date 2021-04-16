import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_user_settings from "../api/update_settings";


export default function SettingsOrderInformationForm ({...props}){
    const handleResult = async (result) => {
        if (result.ok) {
            props.navigation.goBack(null);
        } else {
            throw new Error('Failed.');
        }
    };

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 2, marginTop: '10%'}}>
                <Form
                    action={update_user_settings}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    item={props.route.params.item}
                    fields={{
                        user_settings_order_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.order_days,
                            validators: [],
                            maxLength: 10,
                        },
                        user_settings_delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.delivery_days,
                            validators: [],
                            maxLength: 50,
                        },
                        user_settings_max_order_number: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.max_order_number,
                            validators: [],
                            maxLength: 50,
                        },
                    }}
                />
            </View>
        </View>
    )
}