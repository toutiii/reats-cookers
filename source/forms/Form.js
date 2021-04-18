import React, { useState, useEffect } from 'react';
import {ActivityIndicator, Animated, KeyboardAvoidingView, ScrollView, Text, TextInput, View} from "react-native";
import CustomButton from "../button/CustomButton";
import all_constants from "../constants";
import {validateFields} from "../validators/validate_dishformview"
import FormField from "../components/FormField";
import styles_form from "../styles/styles-form"
import AwesomeAlert from 'react-native-awesome-alerts';


const getInitialErrorsState = (fieldKeys) => {
    const errors_state = {};
    fieldKeys.forEach((key) => {errors_state[key] = '';});
    return errors_state;
};


export default function Form({ ...props }) {
    const fieldKeys = Object.keys(props.fields)

    const fieldsObject = props.fields

    const [newItem, setValues] = useState(props.item);

    //To be sure to reset form initial content when we press on a flatlist item.
    useEffect(() => {
        setValues(props.item)
    }, [props.item])

    const [errorMessage, setErrorMessage] = useState('');

    const [validationErrors, setValidationErrors] = useState(getInitialErrorsState(fieldKeys));

    const [opacity] = useState(new Animated.Value(1));

    const [isSubmitting, setSubmitting] = useState(false);

    const [showAlert, setStateShowAlert] = useState(false);

    const [noErrorsFound, setNoErrorsFound] = useState(true);

    const onChangeValue = (key, value) => {
        const newState = { ...newItem, [key]: value };
        setValues(newState);
        if (validationErrors[key]) {
            const newErrors = { ...validationErrors, [key]: '' };
            setValidationErrors(newErrors);
        }
    };

    const fadeOut = () => {
        Animated.timing(opacity, { toValue: 0.2, duration: 200, useNativeDriver: true }).start();
    }

    const fadeIn = () => {
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    }

    //################ USEFUL FOR TESTING ###############
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //################ USEFUL FOR TESTING ################

    const submit = async () => {
        setSubmitting(true);
        setErrorMessage('');
        setValidationErrors(getInitialErrorsState(fieldKeys, props));
        newItem['id'] = props.item['id']
        const errors = validateFields(props.fields, newItem);
        if (Object.keys(errors).length !== 0) {
            setSubmitting(false);
            setStateShowAlert(true);
            setNoErrorsFound(true);
            return setValidationErrors(errors);
        }
        fadeOut();
        try {
            const result = await props.action(newItem);
            await sleep(1000)
            fadeIn();
            setStateShowAlert(true)
            await props.afterSubmit(result)
        } catch (e) {
            setErrorMessage(e.message);
            fadeIn();
        }
        setSubmitting(false);
    };

    const cancel = () => {
        props.navigation.goBack()
    };

    return(
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={styles_form.container}>
                    {isSubmitting && (
                        <View style={styles_form.activityIndicatorContainer}>
                            <ActivityIndicator size="large" color="tomato" />
                        </View>
                    )}
                    {!isSubmitting && noErrorsFound && (
                        <View style={{flex: 1}}>
                            <AwesomeAlert
                                show={showAlert}
                                title={all_constants.messages.success.title}
                                closeOnTouchOutside={false}
                                closeOnHardwareBackPress={false}
                                showConfirmButton={true}
                                confirmText="OK"
                                confirmButtonColor="green"
                                onConfirmPressed={() => {setStateShowAlert(false)}}
                            />
                        </View>
                    )}
                    <Animated.View style={{flex: 1, opacity, width: '100%'}}>
                        {
                            fieldKeys.map((key) => {
                            return(
                                <FormField
                                    key={key}
                                    itemObject={props.item}
                                    fieldName={key}
                                    field={fieldsObject[key]}
                                    error={validationErrors[key]}
                                    onChangeText={onChangeValue}
                                    value={newItem[key]}
                                    showAlert={showAlert}
                                    onConfirmPressed={() => {setStateShowAlert(false)}}
                                />
                            )
                        })}
                    </Animated.View>
                    <View style={{flex: 1}}>
                        <View style={styles_form.submit_button}>
                            <CustomButton
                                label={all_constants.messages.submit}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={18}
                                backgroundColor={'green'}
                                label_color='white'
                                onPress={submit}
                            />
                        </View>
                        <View style={styles_form.cancel_button}>
                            <CustomButton
                                label={all_constants.messages.cancel}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={18}
                                backgroundColor={'red'}
                                label_color='white'
                                onPress={cancel}
                            />
                        </View>
                        {
                            props.third_button_label ?
                                <View style={styles_form.cancel_button}>
                                    <CustomButton
                                        label={props.third_button_label}
                                        height={50}
                                        border_radius={30}
                                        font_size={18}
                                        backgroundColor={'tomato'}
                                        label_color='white'
                                        onPress={cancel}
                                    />
                                </View>
                                :
                                <View></View>
                        }
                        {
                            props.fourth_button_label ?
                                <View style={styles_form.cancel_button}>
                                    <CustomButton
                                        label={props.fourth_button_label}
                                        height={50}
                                        border_radius={30}
                                        font_size={18}
                                        backgroundColor={'darkgrey'}
                                        label_color='white'
                                        onPress={cancel}
                                    />
                                </View>
                            :
                                <View></View>
                        }
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )}