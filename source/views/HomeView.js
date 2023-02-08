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


                    {/*
                        THE TOGGLE
                    */}

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
                                onValueChange={() => {this.setState({showAlert: true})}}
                                value={!this.state.is_online}
                            />
                        </View>
                    </View>

                    {/*
                        CURRENT WEEK ORDER
                    */}

                    <View style={styles_home_view.label_view}>
                        <Text style={{fontSize: 20, textAlign: 'center' }}>
                            {all_constants.label.home.current_week_orders}
                        </Text>
                    </View>
                    <View style={styles_home_view.order_view_style}>
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'left', fontSize: 18, color: 'green'}}>
                                {all_constants.label.home.paid}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'green'}}>
                                {this.paid_orders_count + '/' + this.max_paid_orders}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <CustomImageButton
                                onPress={() => this.onPressNavigateToTab('OrdersTab', 'PaidOrders')}
                                uri={this.arrow_uri}
                            />
                        </View>
                    </View>
                    <View style={styles_home_view.order_view_style}>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'left', fontSize: 18, color: 'red'}}>
                                {all_constants.label.home.canceled}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: 'red'}}>
                                {this.cancelled_orders_count}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <CustomImageButton
                                onPress={() => this.onPressNavigateToTab('OrdersTab', 'CancelledOrders')}
                                uri={this.arrow_uri}
                            />
                        </View>
                    </View>
                    <View style={styles_home_view.order_view_style}>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'left', fontSize: 18}}>
                                {all_constants.label.home.total}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{textAlign: 'center', fontSize: 20}}>
                                {this.total_orders_count}
                            </Text>
                        </View>
                        <View style={{flex: 1,}}></View>
                    </View>

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