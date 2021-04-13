import React, {Component} from "react";
import {Alert, Text, View} from "react-native";
import all_constants from "../constants";
import styles_settings from "../styles/styles-settings"
import CustomButton from "../button/CustomButton";
import {getUserSettings} from "../helpers/settings_helpers";


export default class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.userInfosObject = getUserSettings()
    }
    onSubmit = () => {
        Alert.alert('DIO !')
    }
    render() {
        return(
            <View style={styles_settings.container}>
                <View style={styles_settings.title}>
                    <Text style={styles_settings.title_text}> {all_constants.label.settings.my_account} </Text>
                </View>
                <View style={{flex: 12}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            label={all_constants.label.settings.siret}
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.siret}
                            borderBottomWidth={1}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            label={all_constants.label.settings.firstname}
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.firstname}
                            onPress={this.onSubmit}
                            borderBottomWidth={1}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            label={all_constants.label.settings.lastname}
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.lastname}
                            onPress={this.onSubmit}
                            borderBottomWidth={1}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            icon_name='location'
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.address}
                            onPress={this.onSubmit}
                            borderBottomWidth={1}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            label={all_constants.label.settings.postal_code}
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.postal_code}
                            onPress={this.onSubmit}
                            borderBottomWidth={1}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            label={all_constants.label.settings.town}
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.town}
                            onPress={this.onSubmit}
                            borderBottomWidth={1}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <CustomButton
                            icon_name='call'
                            height={50}
                            font_size={20}
                            use_second_label={true}
                            second_label={this.userInfosObject.phone}
                            onPress={this.onSubmit}
                            borderBottomWidth={1}
                        />
                    </View>
                </View>
                <View style={{flex: 2}}>
                    <CustomButton
                        label={all_constants.label.settings.change_password}
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        backgroundColor={'tomato'}
                        label_color='white'
                        onPress={this.onSubmit}
                    />
                </View>
            </View>
        )
    }
}