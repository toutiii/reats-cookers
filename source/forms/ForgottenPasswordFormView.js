import React from "react";
import {View} from "react-native";
import Form from "./Form";
import submit_login_credentials from "../api/submit_login_credentials";
import all_constants from "../constants";
import {checkValueIsDefined} from "../validators/global_validators";
import {checkEmailFormat} from "../validators/settingsform_validators";

export default function ForgottenPasswordFormView({...props}){
    const handleResult = async (result) => {
        if (result.ok) {
            //props.navigation.goBack();
        } else {
            throw new Error('Failed.');
        }
    };
    return(
        <View style={{flex: 1, marginTop: '25%'}}>
            <View style={{flex: 1}}>
                <Form
                    action={submit_login_credentials}
                    navigation={props.navigation}
                    afterSubmit={handleResult}
                    reset_password={true}
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
                    }}
                />
            </View>
        </View>
    )
}