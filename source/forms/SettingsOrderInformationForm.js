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

    function getIndexofDays(fieldName){
        const daysObject = getDaysOfWeek();
        let days = [];
        let IndexofDays = []
        daysObject.forEach((keyObject) => {
            days.push(keyObject.itemDescription);
        })
        if (props.route.params.item[fieldName] && props.route.params.item[fieldName].length !== 0) {
            const daysFromBackend = props.route.params.item[fieldName].split(', ')
            daysFromBackend.forEach((day) => {
                IndexofDays.push(days.indexOf(day) + 1)
            })
        }
        return IndexofDays
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
                            validators: [],
                            checkedItems: getIndexofDays('order_days'),  // Will be used by PickerCheckBox in FormField
                            maxLength: 10,
                        },
                        delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.delivery_days,
                            validators: [],
                            checkedItems: getIndexofDays('delivery_days'),  // Will be used by PickerCheckBox in FormField
                            maxLength: 50,
                        },
                        max_order_number: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.max_order_number,
                            validators: [],
                            maxLength: 50,
                        },
                        noon_delivery_hours: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.noon_delivery_hours,
                            validators: [],
                            maxLength: 10,
                        },
                        noon_delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.noon_delivery_days,
                            validators: [],
                            checkedItems: getIndexofDays('noon_delivery_days'),  // Will be used by PickerCheckBox in FormField
                            maxLength: 50,
                        },
                        evening_delivery_hours: {
                            type: all_constants.field_type.textinput,
                            label: all_constants.label.form.settings.evening_delivery_hours,
                            validators: [],
                            maxLength: 50,
                        },
                        evening_delivery_days: {
                            type: all_constants.field_type.select_picker,
                            label: all_constants.label.form.settings.evening_delivery_days,
                            checkedItems: getIndexofDays('evening_delivery_days'),  // Will be used by PickerCheckBox in FormField
                            validators: [],
                            maxLength: 50,
                        },
                    }}
                />
            </View>
        </View>
    )
}