import React, { Component } from 'react';
import { Image, Switch, Text, View} from "react-native";
import styles_home_view from '../styles/styles-home-view'
import all_constants from "../constants";
import CustomImageButton from "../button/CustomImageButton";
import CustomButton from "../button/CustomButton";
import {setToken} from "../api/token";
import {CommonActions} from "@react-navigation/native";
import CustomAlert from "../components/CustomAlert";


import LogoutAndParametersButtonsView from './LogoutAndParametersButtonsView.js';
import UserProfilePicAndInformationView from './UserProfilePicAndInformationView';
import ToggleView from './ToggleView';
import CurrentWeekOrderView from './CurrentWeekOrderView';
export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_online: false,
            showAlert: false,
            willLogout: false,
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
        this.average_response_time = '15min'
        this.average_rating = "4.4/5"
    }
    logout = async () => {
        await setToken('');
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: 'Signin'}]
        });
        this.props.navigation.dispatch(resetAction);
    }
    onPressNavigateToTab= (tab_name, screen_name) => {
        this.props.navigation.navigate(tab_name, { screen: screen_name });
    }

    render () {
        return (
            <View style={styles_home_view.container}>
                {
                    this.state.willLogout ?
                        <CustomAlert
                            show={this.state.showAlert}
                            title={all_constants.custom_alert.homeview.logout_title}
                            message={all_constants.custom_alert.homeview.logout_message}
                            confirmButtonColor='green'
                            showCancelButton={true}
                            cancelButtonColor='red'
                            cancelText={all_constants.custom_alert.homeview.cancel_text}
                            onConfirmPressed={() => {
                                this.setState({showAlert: false})
                                this.logout();
                            }}
                            onCancelPressed={() => {
                                this.setState({willLogout: false});
                                this.setState({showAlert: false});
                            }}
                        />
                        :
                        <CustomAlert
                            show={this.state.showAlert}
                            title={all_constants.custom_alert.homeview.title}
                            message={
                                !this.state.is_online ?
                                    all_constants.custom_alert.homeview.go_offline
                                    :
                                    all_constants.custom_alert.homeview.go_online
                            }
                            confirmButtonColor='green'
                            showCancelButton={true}
                            cancelButtonColor='red'
                            cancelText={all_constants.custom_alert.homeview.cancel_text}
                            onConfirmPressed={() => {
                                this.setState({is_online: !this.state.is_online});
                                this.setState({showAlert: false})
                            }}
                            onCancelPressed={() => {
                                this.setState({showAlert: false})
                            }}
                        />
                }
                <View style={{alignItems: 'center'}}>

                    {/*
                        THE LOGOUT AND PARAMETERS BUTTONS
                    */}

                    <LogoutAndParametersButtonsView></LogoutAndParametersButtonsView>

                    {/*
                        USER PROFILE PIC AND INFORMATION
                    */}

                    <UserProfilePicAndInformationView></UserProfilePicAndInformationView>

                    {/*
                        THE TOGGLE
                    */}

                    <ToggleView></ToggleView>

                    {/*
                        CURRENT WEEK ORDER
                    */}

                    <CurrentWeekOrderView></CurrentWeekOrderView>

                    {/*
                        BALANCE
                    */}

                    <View style={styles_home_view.label_view}>
                        <Text style={{fontSize: 20, textAlign: 'center'}}>
                            {all_constants.label.home.balance}
                        </Text>
                    </View>
                    <View style={styles_home_view.order_view_style}>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'left', fontSize: 18}}>
                                {all_constants.label.home.pending}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'center', fontSize: 20}}>
                                {this.current_balance}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <CustomImageButton
                                onPress={() => this.onPressNavigateToTab('BalanceTab', 'PendingBalance')}
                                uri={this.arrow_uri}
                            />
                        </View>
                    </View>

                    {/*
                        STATS
                    */}

                    <View style={styles_home_view.label_view}>
                        <Text style={{fontSize: 20, textAlign: 'center'}}>
                            {all_constants.label.home.global_stats}
                        </Text>
                    </View>
                    <View style={styles_home_view.order_view_style}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 18}}>
                                {all_constants.label.home.average_response_time}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'center', fontSize: 18}}>
                                {this.average_response_time}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <CustomImageButton
                                onPress={() => this.onPressNavigateToTab('StatsView')}
                                uri={this.arrow_uri}
                            />
                        </View>
                    </View>
                    <View style={styles_home_view.order_view_style}>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 18}}>
                                {all_constants.label.home.average_rating}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'center', fontSize: 18}}>
                                {this.average_rating}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <CustomImageButton
                                onPress={() => this.onPressNavigateToTab('StatsView')}
                                uri={this.arrow_uri}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}