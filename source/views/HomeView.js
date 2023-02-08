import React, { Component } from 'react';
import {View} from "react-native";
import styles_home_view from '../styles/styles-home-view'
import all_constants from "../constants";
import {setToken} from "../api/token";
import {CommonActions} from "@react-navigation/native";
import CustomAlert from "../components/CustomAlert";
import LogoutAndParametersButtonsView from './LogoutAndParametersButtonsView.js';
import UserProfilePicAndInformationView from './UserProfilePicAndInformationView';
import ToggleView from './ToggleView';
import CurrentWeekOrderView from './CurrentWeekOrderView';
import SplitBalanceView from './SplitBalanceView';
import SplitStatsView from './SplitStatsView';
export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_online: false,
            showAlert: false,
            willLogout: false,
        }
    }
    logout = async () => {
        await setToken('');
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: 'Signin'}]
        });
        this.props.navigation.dispatch(resetAction);
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
                    <SplitBalanceView></SplitBalanceView>
                    {/*
                        STATS
                    */}
                    <SplitStatsView></SplitStatsView>
                </View>
            </View>
        )
    }
}