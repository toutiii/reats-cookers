import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_user_settings from "../api/update_settings";


export default function SettingsPersonalInformationForm ({...props}){
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
                        user_settings_siret: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.siret,
                            validators: [],
                            maxLength: 10,
                        },
                        user_settings_firstname: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.firstname,
                            validators: [],
                            maxLength: 50,
                        },
                        user_settings_lastname: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.lastname,
                            validators: [],
                            maxLength: 50,
                        },
                        user_settings_phone: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.phone,
                            validators: [],
                            maxLength: 10,
                        },
                    }}
                />
            </View>
        </View>
    )
}