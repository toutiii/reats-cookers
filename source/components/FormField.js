import React, { useState, useEffect } from "react";
import {
    Image,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    TouchableHighlight,
} from "react-native";
import styles_field from "../styles/styles-field";
import all_constants from "../constants";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { getDaysOfWeek } from "../helpers/global_helpers";
import CustomButton from "../button/CustomButton";
import FormLabelModal from "../modals/FormLabelModal";
import CustomAlert from "./CustomAlert";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as Device from "expo-device"; // eslint-disable-line no-unused-vars
import styles_home_view from "../styles/styles-home-view";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { getCountryIdByName } from "../helpers/global_helpers";

export default function FormField({ ...props }) {
    const [
        showAlert,
        setStateShowAlert
    ] = useState(false);
    const [
        picUri,
        setPicUri
    ] = useState(null);
    const [
        category,
        setCategory
    ] = useState(null);
    const [
        unit,
        setUnit
    ] = useState(null);
    const [
        labelModalState,
        setLabelModalState
    ] = useState(false);
    const [
        date,
        setDate
    ] = useState(new Date());
    const [
        show,
        setShow
    ] = useState(false);
    const [
        mode,
        setMode
    ] = useState("date");
    const [
        selected, // eslint-disable-line no-unused-vars
        setSelected,
    ] = useState("");
    const [
        countryID,
        setCountryID, // eslint-disable-line no-unused-vars
    ] = props.newItem.country
        ? useState(getCountryIdByName(props.newItem.country)) // eslint-disable-line react-hooks/rules-of-hooks
        : useState(5); // eslint-disable-line react-hooks/rules-of-hooks
    const [
        postalCode,
        setPostalCode
    ] = useState(props.newItem.postal_code);

    const showDatepicker = () => {
        showMode("date");
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        if (event.type === "set") {
            props.onChangeText(props.fieldName, moment(currentDate).format("DD-MM-YYYY"));
        }
    };

    useEffect(() => {
        if (
            postalCode !== undefined &&
            postalCode.length === all_constants.max_length.form.postal_code
        ) {
            props.getTownFromPostalCode(postalCode);
        }
        if (
            postalCode !== undefined &&
            postalCode.length < all_constants.max_length.form.postal_code
        ) {
            props.getTownFromPostalCode(null);
        }
    }, [
        postalCode
    ]);

    useEffect(() => {
        setPicUri(props.newItem.photo);
        setCategory(props.newItem.category);
        setUnit(props.newItem.unit);
    }, [
        props.newItem
    ]);

    const options = {
        allowsEditing: true,
        aspect: [
            16,
            9
        ],
        quality: 1,
        base64: false,
    };

    const launchGallery = async () => {
        if (Platform.OS !== "web") {
            const statusObject = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (statusObject.status !== "granted") {
                setStateShowAlert(true);
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({ options });

                if (!result.canceled) {
                    setPicUri(result.assets[0].uri);
                    props.newItem["photo"] = result.assets[0].uri;
                }
            }
        }
    };

    const launchCamera = async () => {
        if (Platform.OS !== "web") {
            const statusObject = await ImagePicker.requestCameraPermissionsAsync();
            if (statusObject.status !== "granted") {
                setStateShowAlert(true);
            } else {
                let result = await ImagePicker.launchCameraAsync({ options });
                if (!result.canceled) {
                    setPicUri(result.assets[0].uri);
                    props.newItem["photo"] = result.assets[0].uri;
                }
            }
        }
    };

    return (
        <View style={[
            styles_field.container,
            { padding: "10%" }
        ]}>
            <View style={styles_field.label}>
                {props.field.fieldIsMandatory
                    ? (
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text style={{ color: "red", fontSize: 22 }}>*</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontStyle: props.field.isReadOnly
                                        ? "italic"
                                        : "normal",
                                }}
                            >
                                {props.field.hideLabel
                                    ? ""
                                    : props.field.label}
                            </Text>
                        </View>
                    )
                    : (
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontStyle: props.field.isReadOnly
                                        ? "italic"
                                        : "normal",
                                }}
                            >
                                {props.field.hideLabel
                                    ? ""
                                    : props.field.label}
                            </Text>
                        </View>
                    )}
                {props.field.labelModal && (
                    <View style={{ alignItems: "center" }}>
                        <CustomButton
                            label={"?"}
                            backgroundColor='tomato'
                            label_color='white'
                            height={23}
                            button_width={23}
                            border_radius={30}
                            font_size={12}
                            onPress={() => {
                                setLabelModalState(true);
                            }}
                        />
                    </View>
                )}
            </View>
            {labelModalState && (
                <FormLabelModal
                    state={true}
                    labelModalText={props.field.labelModalText}
                    onPressCloseModal={() => {
                        setLabelModalState(false);
                    }}
                />
            )}
            {(props.field.type === all_constants.field_type.textinput ||
                props.field.type === all_constants.field_type.textarea) && (
                <View
                    style={[
                        styles_field.textinput_container,
                        {
                            height:
                                props.field.type === all_constants.field_type.textarea
                                    ? 140
                                    : 70,
                        },
                    ]}
                >
                    <TextInput
                        style={styles_field.textinput}
                        value={props.value}
                        onChangeText={(text) => {
                            props.onChangeText(props.fieldName, text),
                            props.fieldName == "postal_code"
                                ? setPostalCode(text)
                                : "";
                        }}
                        maxLength={props.field.maxLength}
                        multiline={props.field.type === all_constants.field_type.textarea}
                        numberOfLines={
                            props.field.type === all_constants.field_type.textarea
                                ? 4
                                : 1
                        }
                        placeholder={props.field.placeholder}
                        keyboardType={props.field.keyboardNumeric
                            ? "numeric"
                            : "default"}
                        editable={!props.field.isReadOnly}
                    />
                    {!props.login && (
                        <View>
                            {props.value
                                ? (
                                    <Text style={{ fontSize: 14 }}>
                                        {all_constants.remaining_char}
                                        {props.field.maxLength - props.value.length}/
                                        {props.field.maxLength}
                                    </Text>
                                )
                                : (
                                    <Text style={{ fontSize: 14 }}>
                                        {all_constants.remaining_char}
                                        {props.field.maxLength}/{props.field.maxLength}
                                    </Text>
                                )}
                        </View>
                    )}
                </View>
            )}
            {props.field.type === all_constants.field_type.select && (
                <View style={styles_field.picker_container}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: props.field.placeholder, value: null }}
                        // Because a picUri is null only when there is no image
                        // and there is no image only when we create a Item.
                        value={unit
                            ? unit
                            : category
                                ? category
                                : null}
                        onValueChange={(value) => props.onChangeText(props.fieldName, value)}
                        items={props.field.selectValues}
                        textInputProps={{
                            fontSize: props.value
                                ? 16
                                : 16,
                            color: props.value
                                ? "black"
                                : "gray",
                        }}
                    />
                </View>
            )}
            {props.field.type === all_constants.field_type.select_picker && (
                <View style={{ flex: 1 }}>
                    <MultipleSelectList
                        setSelected={setSelected}
                        data={getDaysOfWeek()}
                        boxStyles={styles_field.dropdown_box_container}
                        dropdownStyles={styles_field.dropdown_container}
                        placeholder={
                            props.value === null || !props.value || props.value.length === 0
                                ? (
                                    <Text style={{ color: "darkgrey" }}>{props.field.placeholder}</Text>
                                )
                                : (
                                    <Text style={{ color: "black" }}>{props.value}</Text>
                                )
                        }
                    />
                </View>
            )}
            {props.field.type === all_constants.field_type.image && (
                <View style={styles_field.button_container}>
                    <View style={{ flex: 2 }}>
                        {picUri
                            ? (
                                <Image source={{ uri: picUri }} style={{ width: 200, height: 150 }} />
                            )
                            : (
                                <View style={styles_field.no_image}>
                                    <Text>PHOTO</Text>
                                </View>
                            )}
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={styles_field.button}>
                            <TouchableHighlight
                                onPress={launchCamera}
                                style={[
                                    styles_home_view.home_button
                                ]}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        source={require("../images/photo.png")}
                                        style={{ height: 30, width: 30, marginLeft: "100%" }}
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles_field.button}>
                            <TouchableHighlight
                                onPress={launchGallery}
                                style={[
                                    styles_home_view.home_button
                                ]}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        source={require("../images/galerie.png")}
                                        style={{ height: 30, width: 30, marginLeft: "100%" }}
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            )}
            {props.field.type === all_constants.field_type.date_picker && (
                <TouchableWithoutFeedback>
                    <TextInput
                        showSoftInputOnFocus={false}
                        onTouchStart={() => showDatepicker()}
                        style={styles_field.textinput}
                        value={props.value
                            ? props.value
                            : null}
                        placeholder={props.field.placeholder}
                    />
                </TouchableWithoutFeedback>
            )}
            {props.field.type === all_constants.field_type.autocomplete &&
                props.fieldName == "country" && (
                <View style={styles_field.textinput}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        showChevron={false}
                        showClear={false}
                        initialValue={countryID.toString()}
                        onSelectItem={(countryObject) => {
                            if (countryObject !== null) {
                                props.onChangeText(props.fieldName, countryObject.title);
                            }
                        }}
                        dataSet={props.field.autoCompleteValues}
                        textInputProps={{
                            autoCorrect: false,
                            style: {
                                backgroundColor: "white",
                            },
                        }}
                    />
                </View>
            )}
            {props.field.type === all_constants.field_type.autocomplete &&
                props.fieldName == "town" &&
                props.field.autoCompleteValues.length > 0 && (
                <View style={styles_field.textinput}>
                    <AutocompleteDropdown
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        showChevron={false}
                        showClear={false}
                        initialValue={props.newItem.postal_code}
                        onSelectItem={(townObject) => {
                            if (townObject !== null) {
                                props.onChangeText(props.fieldName, townObject.title);
                            }
                        }}
                        dataSet={props.field.autoCompleteValues}
                        textInputProps={{
                            autoCorrect: false,
                            style: {
                                backgroundColor: "white",
                            },
                        }}
                    />
                </View>
            )}
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            )}
            {showAlert && (
                <CustomAlert
                    show={showAlert}
                    title={all_constants.permissions.error}
                    message={all_constants.permissions.gallery}
                    confirmButtonColor='red'
                    onConfirmPressed={props.onConfirmPressed}
                />
            )}
            {props.error && (
                <CustomAlert
                    show={props.showAlert}
                    title={all_constants.messages.errors.title}
                    message={props.error}
                    confirmButtonColor='red'
                    onConfirmPressed={props.onConfirmPressed}
                />
            )}
        </View>
    );
}
