import React, { Component } from 'react';
import { AppearanceProvider } from 'react-native-appearance'
import LoginView from "./components/LoginView";

export default class App extends Component {
    render () {
        return (
            <AppearanceProvider>
                <LoginView/>
            </AppearanceProvider>
        )
    }
}