import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_user_settings from "../api/update_settings";
import {checkValueIsDefined, checkValueNotContainsSpecialChar} from "../validators/global_validators";
import {checkPostalCode} from "../validators/settingsform_validators";


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
                        street_number: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.street_number,
                            placeholder: all_constants.placeholders.form.settings.street_number,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar
                            ],
                            maxLength: 20,
                        },
                        street_name: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.street_name,
                            placeholder: all_constants.placeholders.form.settings.street_name,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar
                            ],
                            maxLength: 100,
                        },
                        address_complement: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.address_complement,
                            placeholder: all_constants.placeholders.form.settings.address_complement,
                            validators: [checkValueNotContainsSpecialChar],
                            maxLength: 100,
                        },
                        postal_code: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.postal_code,
                            placeholder: all_constants.placeholders.form.settings.postal_code,
                            keyboardNumeric: true,
                            validators: [
                                checkValueIsDefined,
                                checkPostalCode
                            ],
                            maxLength: 5,
                        },
                        town: {
                            fieldIsMandatory: true,
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.town,
                            placeholder: all_constants.placeholders.form.settings.town,
                            validators: [
                                checkValueIsDefined,
                                checkValueNotContainsSpecialChar
                            ],
                            maxLength: 100,
                        },
                    }}
                />
            </View>
        </View>
    )
}