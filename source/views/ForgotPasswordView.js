import React, {Component} from 'react';
import {Alert, Image, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import all_constants from '../constants'
import styles from '../styles/styles.js'
import Input from '../components/Input.js'
import CustomButton from '../button/CustomButton.js'


export default class ForgotPasswordView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isEmailFocused: false,
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
        else {
            Alert.alert(
                all_constants.messages.success.title,
                all_constants.messages.success.email_sent + this.state.email)
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
                <CustomButton
                    label={all_constants.messages.send}
                    height={50}
                    top={-110}
                    border_width={3}
                    border_radius={30}
                    font_size={17}
                    label_color={'white'}
                    onPress={this.onSubmit}
                />
            </LinearGradient>
        )
    }
}