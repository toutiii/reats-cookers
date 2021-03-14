import React, { Component } from 'react';
import {Alert, Image, Switch, Text, TouchableHighlight, View} from "react-native";
import styles_home_view from '../styles/styles-home-view'
import all_constants from "../constants";
import CustomImageButton from "../button/CustomImageButton";
import CustomButton from "../button/CustomButton";


export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_online: false,
        }
        this.paid_orders_count = 15
        this.cancelled_orders_count = 1
        this.total_orders_count = 16
        this.current_balance = 150 + ' €'
        this.max_paid_orders = 30
        this.firstname = 'Irene'
        this.lastname = 'Janten'
        this.email = 'toulevi@yahoo.fr'
        this.online_icon_uri = 'https://pics.freeicons.io/uploads/icons/png/11875166141558096434-512.png'
        this.offline_icon_uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-AEN1kYTBtKWdVTnIblOQzv3GR1qa4oI5A&usqp=CAU'
        this.arrow_uri = 'https://pics.freeicons.io/uploads/icons/png/6448667931600321999-512.png'
    }
    onTempSubmit = () => {
        Alert.alert('JOJO', 'DIO !')
    }
    toggleSwitch = () => {
        this.setState({is_online: !this.state.is_online})
        if (this.state.is_online) {
            Alert.alert(all_constants.messages.success.title, all_constants.label.home.online_alert)
        }
        else {
            Alert.alert(all_constants.messages.warning.title, all_constants.label.home.offline_alert)
        }
        console.log(this.state)
    }

    render () {
        return (
            <View style={styles_home_view.container}>
                <View style={[styles_home_view.sub_container]}>
                    <CustomButton
                        label={all_constants.messages.logout}
                        backgroundColor='red'
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        label_color='white'
                        onPress={this.onTempSubmit}
                    />
                </View>
                <View style={[styles_home_view.sub_container, { marginTop: '15%'}]}>
                    <View style={{flex: 1, aspectRatio: 1}}>
                        <Image
                            source={require('../images/mum_test.jpg')}
                            style={styles_home_view.profile_pic}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: 'stretch', marginLeft: 20}}>
                       <Text
                           numberOfLines={1}
                           adjustsFontSizeToFit
                           style={{fontSize: 30, textAlign: 'left'}}>
                           {this.lastname + ' ' + this.firstname}
                       </Text>
                        <Text style={{ fontSize: 17,color: 'grey', textAlign: 'left'}}>
                            {this.email}
                        </Text>
                    </View>
                </View>
                <View style={[styles_home_view.order_view_style, {marginTop: '10%'}]}>
                    <View style={{flex: 1}}>
                        <Image
                            source={{uri: this.state.is_online ? this.offline_icon_uri : this.online_icon_uri}}
                            style={{width: 30, height: 30}}
                        />
                    </View>
                    <View style={{flex: 1,}}>
                        <Text style={
                            [
                                styles_home_view.text,
                                {color: this.state.is_online ? 'red' : 'green'},
                                {textAlign: 'center'}
                            ]
                        }>
                            {this.state.is_online ? all_constants.label.home.status.offline : all_constants.label.home.status.online}
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Switch
                            onValueChange={this.toggleSwitch}
                            value={!this.state.is_online}
                        />
                    </View>
                </View>
                <View style={styles_home_view.label_view}>
                    <Text style={{fontSize: 20, }}>
                        CURRENT WEEK ORDERS
                    </Text>
                </View>
                <View style={styles_home_view.order_view_style}>
                    <View style={{flex: 1}}>
                        <Text style={{textAlign: 'left', fontSize: 20, color: 'green'}}>
                            PAID
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'green'}}>
                            {this.paid_orders_count + '/' + this.max_paid_orders}
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <CustomImageButton
                            onPress={this.onTempSubmit}
                            uri={this.arrow_uri}
                        />
                    </View>
                </View>
                <View style={styles_home_view.order_view_style}>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'left', fontSize: 20, color: 'red'}}>
                            CANCELED
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'red'}}>
                            {this.cancelled_orders_count}
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <CustomImageButton
                            onPress={this.onTempSubmit}
                            uri={this.arrow_uri}
                        />
                    </View>
                </View>
                <View style={styles_home_view.order_view_style}>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'left', fontSize: 20, color: 'blue'}}>
                            TOTAL
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'center', fontSize: 20, color: 'blue'}}>
                            {this.total_orders_count}
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <CustomImageButton
                            onPress={this.onTempSubmit}
                            uri={this.arrow_uri}
                        />
                    </View>
                </View>
                <View style={styles_home_view.label_view}>
                    <Text style={{fontSize: 20, }}>
                        BALANCE
                    </Text>
                </View>
                <View style={styles_home_view.order_view_style}>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'left', fontSize: 20}}>
                            BALANCE
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <Text style={{textAlign: 'center', fontSize: 20}}>
                            {this.current_balance}
                        </Text>
                    </View>
                    <View style={{flex: 1,}}>
                        <CustomImageButton
                            onPress={this.onTempSubmit}
                            uri={this.arrow_uri}
                        />
                    </View>
                </View>
            </View>

        )
    }
}