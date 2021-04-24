import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_user_settings from "../api/update_settings";


export default function SettingsCredentialsForm ({...props}){
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
                        email: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.email,
                            placeholder: all_constants.placeholders.form.settings.email,
                            validators: [],
                            maxLength: 100,
                        },
                        user_settings_current_password: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.current_password,
                            placeholder: all_constants.placeholders.form.settings.user_settings_current_password,
                            validators: [],
                            maxLength: 12,
                        },
                        user_settings_new_password: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.new_password,
                            placeholder: all_constants.placeholders.form.settings.user_settings_new_password,
                            validators: [],
                            maxLength: 12,
                        },
                        user_settings_new_password_confirmation: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.new_password_confirmation,
                            placeholder: all_constants.placeholders.form.settings.user_settings_new_password_confirmation,
                            validators: [],
                            maxLength: 12,
                        },
                    }}
                />
            </View>
        </View>
    )
}