import React, {Component} from 'react';
import {Alert, Image, Switch, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import all_constants from '../constants'
import styles from '../styles/styles.js'
import Input from '../components/Input.js'
import CustomButton from '../button/CustomButton.js'


export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailFocused: false,
            isPasswordFocused: false,
            showPassword: true,
        }
        this.colors = all_constants.colors.login_background_color
        this.images_keys = Object.keys(all_constants.stars_images).sort(() => 0.5 - Math.random())
        this.first_image = this.images_keys[0]
        this.random_colors = this.colors.sort(() => 0.5 - Math.random())
        this.is_yellow_second = (this.random_colors[1] === 'yellow')  // When the second color is yellow, some text are barely visible.
    }
    onFocusEmail = () => {
        this.setState({isEmailFocused: true})
    }
    onBlurEmail = () => {
        this.setState({isEmailFocused: false})
    }
    onFocusPassword = () => {
        this.setState({isPasswordFocused: true})
    }
    onBlurPassword = () => {
        this.setState({isPasswordFocused: false})
    }
    toggleSwitch = () => {
        this.setState({ showPassword: ! this.state.showPassword });
    }
    onSubmitForgotPassword = () => {
        Alert.alert('Error', 'Forgot password !')
    }
    onSubmit = () => {
        if (this.state.email === '') {
            Alert.alert(
                all_constants.messages.errors.title,
                all_constants.messages.errors.empty_email)
        }
        else if (this.state.email !== '' & ! all_constants.email.regex.test(this.state.email)) {
            Alert.alert(
                all_constants.messages.errors.title,
                all_constants.messages.errors.wrong_email_format)
        }
        else if (this.state.password === '') {
            Alert.alert(
                all_constants.messages.errors.title,
                all_constants.messages.errors.empty_password)
        }
        else {
            console.log(this.state)
        }
    }
    render () {
        return (
            <LinearGradient
                colors={this.random_colors}
                style={[styles.background]}
            >
                <Image
                    style={styles.star}
                    source={all_constants.stars_images[this.first_image]}
                />
                <Text style={styles.welcome_text}>
                    Welcome on Afro Eats !
                </Text>
                <Input
                    placeholder="Email"
                    placeholderTextColor='white'
                    icon_uri='https://pics.freeicons.io/uploads/icons/png/20576625201554892219-512.png'
                    onFocus={this.onFocusEmail}
                    onBlur={this.onBlurEmail}
                    onChangeText={email => this.setState({email})}
                    focus={this.state.isEmailFocused}
                    value={this.state.email}
                />
                <Input
                    placeholder="Password"
                    placeholderTextColor='white'
                    icon_uri='https://pics.freeicons.io/uploads/icons/png/3195670751578982974-512.png'
                    onFocus={this.onFocusPassword}
                    onBlur={this.onBlurPassword}
                    onChangeText={password => this.setState({password})}
                    focus={this.state.isPasswordFocused}
                    secureTextEntry={this.state.showPassword}
                    value={this.state.password}
                />
                <Switch
                    style={{top: -177, left: all_constants.screen.width-235}}
                    onValueChange={this.toggleSwitch}
                    value={!this.state.showPassword}
                />
                <CustomButton
                    label={all_constants.messages.login}
                    height={50}
                    top={-110}
                    border_width={3}
                    border_radius={30}
                    font_size={17}
                    label_color={this.is_yellow_second ? 'black' : 'white'}
                    onPress={this.onSubmit}
                />
                <CustomButton
                    label={all_constants.messages.errors.forgot_password}
                    height={35}
                    top={-70}
                    border_width={3}
                    border_radius={30}
                    font_size={14}
                    label_color={this.is_yellow_second ? 'black' : 'white'}
                    onPress={this.onSubmitForgotPassword}
                />
            </LinearGradient>
        )
    }
}
