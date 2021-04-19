import React, { useState, useEffect } from 'react';
import { Image, Platform, Text, TextInput, View } from 'react-native';
import styles_field from "../styles/styles-field"
import all_constants from "../constants";
import RNPickerSelect from 'react-native-picker-select';
import {getCategories} from "../helpers/global_helpers"
import AwesomeAlert from 'react-native-awesome-alerts';
import CustomImageButton from "../button/CustomImageButton";
import * as ImagePicker from "expo-image-picker"
import PickerCheckBox from 'react-native-picker-checkbox';
import {getDaysOfWeek} from "../helpers/global_helpers";


export default function FormField({...props}) {
    const [showAlert, setStateShowAlert] = useState(false)
    const [picUri, setPicUri] = useState(null)
    const [category, setCategory] = useState(null)
    useEffect(() => {
            setPicUri(props.itemObject.dish_photo)
    }, [props.itemObject])
    const options = {
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
        base64: false
    };

    const launchGallery =  async () => {
        if (Platform.OS !== 'web') {
            const statusObject = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (statusObject.status !== 'granted') {
                setStateShowAlert(true)
            }
            else{
                let result = await ImagePicker.launchImageLibraryAsync({options});
                if (!result.cancelled) {
                    setPicUri(result.uri)
                }
            }
        }
    }

    const launchCamera = async () => {
        if (Platform.OS !== 'web') {
            const statusObject = await ImagePicker.requestCameraPermissionsAsync();
            if (statusObject.status !== 'granted') {
                setStateShowAlert(true)
            }
            else{
                let result = await ImagePicker.launchCameraAsync({options});
                if (!result.cancelled) {
                    setPicUri(result.uri)
                }
            }
        }
    }

    return (
        <View style={styles_field.container}>
            <View style={styles_field.label}>
                <Text style={{fontSize: 20}}>{props.field.label}</Text>
            </View>
            {
                props.field.type === all_constants.field_type.textinput ?
                    <View style={styles_field.textinput_container}>
                        <TextInput
                            style={styles_field.textinput}
                            value={props.value}
                            placeholder={props.value ? '' : all_constants.placeholders.menu}
                            onChangeText={(text) => props.onChangeText(props.fieldName, text)}
                            maxLength={props.field.maxLength}
                            keyboardType={props.fieldName.includes('price') ? "decimal-pad" : 'default'}
                        />
                        {
                            props.value ?
                                <Text style={{fontSize: 14}}>
                                    {all_constants.remaining_char}
                                    {props.field.maxLength - props.value.length}/{props.field.maxLength}
                                </Text>
                            :
                                <Text style={{fontSize: 14}}>
                                    {all_constants.remaining_char}
                                    {props.field.maxLength}/{props.field.maxLength}
                                </Text>
                        }
                        {
                            props.error ?
                                <AwesomeAlert
                                    show={props.showAlert}
                                    title={all_constants.messages.errors.title}
                                    message={props.error}
                                    closeOnTouchOutside={false}
                                    closeOnHardwareBackPress={false}
                                    showConfirmButton={true}
                                    confirmText="OK"
                                    confirmButtonColor="#DD6B55"
                                    onConfirmPressed={props.onConfirmPressed}
                                />
                            :
                                <View></View>
                        }
                    </View>
                    :
                    <View></View>
            }
            {
                props.field.type === all_constants.field_type.select ?
                    <View style={styles_field.picker_container}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: all_constants.placeholders.dish_category, value: null }}
                            // Because a picUri is null only when there is no image and there is no image only when we create a Dish.
                            value={picUri ? props.value : category}
                            onValueChange={(value) => props.onChangeText(props.fieldName, value)}
                            items={getCategories('Dish')}
                            textInputProps={{fontSize: props.value ? 18 : 16, color: props.value ? 'black' : 'gray'}}
                        />
                    </View>
                    :
                    <View></View>
            }
            {
                props.field.type === all_constants.field_type.select_picker ?
                    <View style={styles_field.picker_container}>
                        <PickerCheckBox
                            data={getDaysOfWeek()}
                            headerComponent={<Text style={{fontSize:18}} >{all_constants.label.settings.select_days_of_week}</Text>}
                            OnConfirm={(value) => {
                                if (value.length !== 0) {
                                    let valueArray = []
                                    value.forEach((key) => {valueArray.push(key.itemDescription)})
                                    props.onChangeText(props.fieldName, valueArray.join(', '))
                                    }
                                else {
                                    props.onChangeText(props.fieldName, value)
                                }}
                            }
                            ConfirmButtonTitle='OK'
                            DescriptionField='itemDescription'
                            KeyField='itemKey'
                            placeholder={
                                props.value === null || !props.value || props.value.length === 0?
                                    <Text style={{color: 'darkgrey'}}>{all_constants.label.settings.select_days_of_week}</Text>
                                :
                                    <Text style={{color: 'black'}}>{props.value}</Text>

                            }
                            arrowSize={0}
                            placeholderSelectedItems={'' + props.value}
                            dividerVisible={true}
                            checkedItems={props.field.checkedItems}
                        />
                    </View>
                    :
                    <View></View>
            }
            {
                props.field.type === all_constants.field_type.image ?
                    <View style={styles_field.button_container}>
                        <View style={{flex: 2}}>
                            {
                                picUri ?
                                    <Image
                                        source={{uri: picUri}}
                                        style={{width: 200, height: 150}}
                                    />
                                :
                                    <View style={styles_field.no_image}>
                                        <Text>PHOTO</Text>
                                    </View>
                            }

                        </View>
                        <View style={{flex: 1}}>
                            <View style={styles_field.button}>
                                <CustomImageButton
                                    onPress={launchCamera}
                                    uri={'https://pics.freeicons.io/uploads/icons/png/20607508171555590649-512.png'}
                                />
                            </View>
                            <View style={styles_field.button}>
                                <CustomImageButton
                                    onPress={launchGallery}
                                    uri={'https://pics.freeicons.io/uploads/icons/png/6433396501558096324-512.png'}
                                />
                            </View>
                        </View>

                    </View>
                    :
                    <View></View>
            }
            {
                showAlert ?
                    <AwesomeAlert
                        show={showAlert}
                        title={all_constants.permissions.error}
                        message={all_constants.permissions.gallery}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="red"
                        onConfirmPressed={() => {setStateShowAlert(false)}}
                    />
                    :
                    <View></View>
            }
            {
                props.field.type === all_constants.field_type.textarea ?
                    <View style={[styles_field.textinput_container, {height: 140}]}>
                        <TextInput
                            style={styles_field.textinput}
                            value={props.value}
                            onChangeText={(text) => props.onChangeText(props.fieldName, text)}
                            maxLength={props.field.maxLength}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Une courte description de votre plat'}
                        />
                        {
                            props.value ?
                                <Text style={{fontSize: 14}}>
                                    {all_constants.remaining_char}
                                    {props.field.maxLength - props.value.length}/{props.field.maxLength}
                                </Text>
                                :
                                <Text style={{fontSize: 14}}>
                                    {all_constants.remaining_char}
                                    {props.field.maxLength}/{props.field.maxLength}
                                </Text>
                        }
                    </View>
                    :
                    <View></View>
            }
            {
                props.error ?
                    <AwesomeAlert
                        show={props.showAlert}
                        title={all_constants.messages.errors.title}
                        message={props.error}
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="OK"
                        confirmButtonColor="red"
                        onConfirmPressed={props.onConfirmPressed}
                    />
                    :
                    <View></View>
            }
        </View>
    )}