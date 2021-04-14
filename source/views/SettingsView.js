import React, {Component} from "react";
import {Alert, Text, View} from "react-native";
import all_constants from "../constants";
import styles_settings from "../styles/styles-settings"
import CustomButton from "../button/CustomButton";
import {getUserSettings} from "../helpers/settings_helpers";
import Setting from "../components/Setting"


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
                <View style={{flex: 7}}>
                    <Setting
                        label={all_constants.label.settings.siret}
                        value={this.userInfosObject.siret}
                    />
                    <Setting
                        label={all_constants.label.settings.firstname}
                        value={this.userInfosObject.firstname}
                    />
                    <Setting
                        label={all_constants.label.settings.lastname}
                        value={this.userInfosObject.lastname}
                    />
                    <Setting
                        icon_name='location'
                        value={this.userInfosObject.address}
                    />
                    <Setting
                        label={all_constants.label.settings.postal_code}
                        value={this.userInfosObject.postal_code}
                    />
                    <Setting
                        label={all_constants.label.settings.town}
                        value={this.userInfosObject.town}
                    />
                    <Setting
                        icon_name='call'
                        value={this.userInfosObject.phone}
                    />
                    <Setting
                        label={all_constants.label.settings.order_days}
                        value={this.userInfosObject.order_days}
                    />
                    <Setting
                        label={all_constants.label.settings.delivery_days}
                        value={this.userInfosObject.delivery_days}
                    />
                    <Setting
                        label={all_constants.label.settings.max_order_number}
                        value={this.userInfosObject.max_order_number}
                    />
                </View>
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