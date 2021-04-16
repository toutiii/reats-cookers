import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_user_settings from "../api/update_settings";


export default function SettingsAddressForm ({...props}){
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
                        user_settings_street_number: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.street_number,
                            validators: [],
                            maxLength: 10,
                        },
                        user_settings_street_name: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.street_name,
                            validators: [],
                            maxLength: 50,
                        },
                        user_settings_postal_code: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.postal_code,
                            validators: [],
                            maxLength: 50,
                        },
                        user_settings_town: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.town,
                            validators: [],
                            maxLength: 10,
                        },
                    }}
                />
            </View>
        </View>
    )
}