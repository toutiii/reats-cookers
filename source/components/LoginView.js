import React, { Component } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Appearance } from 'react-native-appearance'
import { LinearGradient } from 'expo-linear-gradient';
import all_constants from '../constants'
import styles from '../styles/styles-login-view.js'


export default class LoginView extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
            isEmailFocused: false,
            isPwdFocused: false,
            appearance: Appearance.getColorScheme(),
            textInputBorderColor: '#ffd700'
        }
        this.colors = ['red', 'yellow', 'green']
        this.colors = this.colors.sort(() => 0.5 - Math.random())
        this.images_keys = Object.keys(all_constants.stars_images).sort(() => 0.5 - Math.random())
    }
    onFocusEmailChange = () => {
        this.setState({ isEmailFocused: true });
    }
    onFocusPwdChange = () => {
        this.setState({ isPwdFocused: true });
    }
    onBlurEmailChange = () => {
        this.setState({ isEmailFocused: false });
    }
    onBlurPwdChange = () => {
        this.setState({isPwdFocused: false});
    }
    render() {
        const first_image = this.images_keys[0]
        return (
            <LinearGradient
                colors={this.colors}
                style={styles.background}
            >
                <Image
                    style={styles.star}
                    source={all_constants.stars_images[first_image]}
                />
                <Text style={styles.welcome_text}>
                    Welcome on Afro Eats !
                </Text>
                <TextInput
                    style={
                        [
                            styles.text_input, styles.text_input_email_top,
                            { fontStyle: this.state.email ? 'normal' : 'italic'},
                            { borderColor: this.state.isEmailFocused ? this.state.textInputBorderColor : 'white'},
                        ]
                    }
                    placeholder='Your Email'
                    placeholderTextColor='white'
                    onChangeText={email => this.setState({email})}
                    onFocus={ this.onFocusEmailChange }
                    onBlur={ this.onBlurEmailChange }
                    value={this.state.email}
                />
                <TextInput
                    style={
                        [
                            styles.text_input, styles.text_input_pwd_top,
                            { fontStyle: this.state.pwd ? 'normal' : 'italic'},
                            { borderColor: this.state.isPwdFocused ? this.state.textInputBorderColor : 'white'},
                        ]
                    }
                    placeholder='Your password'
                    placeholderTextColor='white'
                    onChangeText={pwd => this.setState({pwd})}
                    onFocus={ this.onFocusPwdChange }
                    onBlur={ this.onBlurPwdChange }
                    value={this.state.pwd}
                />
                <TouchableOpacity
                    style={styles.login_button}
                    onPress={() => Alert.alert('ZA WARUUDO !')}
                >
                    <Text style={{ fontSize: 17 }}> CONNEXION </Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
}