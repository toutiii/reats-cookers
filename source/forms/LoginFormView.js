import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {Text, View} from "react-native";
import {checkValueIsDefined} from "../validators/global_validators";
import {checkEmailFormat} from "../validators/settingsform_validators";
import {setToken} from "../api/token";
import { CommonActions } from '@react-navigation/native';
import {callBackEnd} from "../api/fetch";

export default function LoginFormView ({...props}){
    const handleResult = async (result) => {
        if (result.ok) {
            await setToken(result.token);
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{name: 'MainTabNavigator'}]
            });
            props.navigation.dispatch(resetAction);
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
                    action={callBackEnd}
                    url={all_constants.uri.api.mock}
                    method={'POST'}
                    navigation={props.navigation}
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