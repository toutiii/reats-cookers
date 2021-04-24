import React from "react";
import Form from "./Form";
import all_constants from "../constants";
import {View} from "react-native";
import update_user_settings from "../api/update_settings";
import {getDaysOfWeek} from "../helpers/global_helpers";

export default function SettingsOrderInformationForm ({...props}){
    const handleResult = async (result) => {
        if (result.ok) {
            props.navigation.goBack(null);
        } else {
            throw new Error('Failed.');
        }
    };

    function getIndexOfDays(fieldName){
        const daysObject = getDaysOfWeek();
        let days = [];
        let indexOfDays = []
        daysObject.forEach((keyObject) => {
            days.push(keyObject.itemDescription);
        })
        if (props.route.params.item[fieldName] && props.route.params.item[fieldName].length !== 0) {
            const daysFromBackend = props.route.params.item[fieldName].split(', ')
            daysFromBackend.forEach((day) => {
                indexOfDays.push(days.indexOf(day) + 1)
            })
        }
        return indexOfDays
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
                        order_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.order_days,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.order_days,
                            placeholder: all_constants.placeholders.form.settings.order_days,
                            validators: [],
                            checkedItems: getIndexOfDays('order_days'),  // Will be used by PickerCheckBox in FormField
                            maxLength: 10,
                        },
                        delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.delivery_days,
                            labelModal: true,
                            placeholder: all_constants.placeholders.form.settings.delivery_days,
                            validators: [],
                            checkedItems: getIndexOfDays('delivery_days'),  // Will be used by PickerCheckBox in FormField
                            maxLength: 51,
                        },
                        max_order_number: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.max_order_number,
                            keyboardNumeric: true,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.max_order_number,
                            placeholder: all_constants.placeholders.form.settings.max_order_number,
                            validators: [],
                            maxLength: 2,
                        },
                        noon_delivery_hours: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.noon_delivery_hours,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.noon_delivery_hours,
                            placeholder: all_constants.placeholders.form.settings.noon_delivery_hours,
                            keyboardNumeric: true,
                            validators: [],
                            maxLength: 5,
                        },
                        noon_delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.noon_delivery_days,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.noon_delivery_days,
                            placeholder: all_constants.placeholders.form.settings.noon_delivery_days,
                            validators: [],
                            checkedItems: getIndexOfDays('noon_delivery_days'),  // Will be used by PickerCheckBox in FormField
                            maxLength: 51,
                        },
                        evening_delivery_hours: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.evening_delivery_hours,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.evening_delivery_hours,
                            placeholder: all_constants.placeholders.form.settings.evening_delivery_hours,
                            keyboardNumeric: true,
                            validators: [],
                            maxLength: 5,
                        },
                        evening_delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.evening_delivery_days,
                            labelModal: true,
                            labelModalText: all_constants.modal.form.settings.evening_delivery_days,
                            placeholder: all_constants.placeholders.form.settings.evening_delivery_days,
                            checkedItems: getIndexOfDays('evening_delivery_days'),  // Will be used by PickerCheckBox in FormField
                            validators: [],
                            maxLength: 51,
                        },
                    }}
                />
            </View>
        </View>
    )
}