import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {Text, View} from "react-native";
import {checkValueIsDefined} from "../validators/global_validators";
import {checkEmailFormat} from "../validators/settingsform_validators";
import submit_login_credentials from "../api/submit_login_credentials";
import HomeStack from "../stack/HomeStack";

export default function LoginFormView (){
    const handleResult = async (result) => {
        if (result.ok) {
            console.log('OK')
        } else {
            throw new Error('Failed.');
        }
    };

    return(
        <View style={{flex: 1, marginTop: '25%'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, margin: '2%'}}>
                <Text> YOU EXPECTED A LOGO BUT IT WAS ME DIO ! </Text>
            </View>
            <View style={{flex: 2}}>
                <Form
                    action={submit_login_credentials}
                    afterSubmit={handleResult}
                    login={true}
                    item={{}}
                    fields={{
                        email: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.login.email,
                            placeholder: all_constants.placeholders.form.login.email,
                            validators: [
                                checkValueIsDefined,
                                checkEmailFormat
                            ],
                            maxLength: 100,
                        },
                        password: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.login.password,
                            placeholder: all_constants.placeholders.form.login.password,
                            validators: [checkValueIsDefined],
                            maxLength: 12,
                        },
                    }}
                />
            </View>
        </View>
    )
}