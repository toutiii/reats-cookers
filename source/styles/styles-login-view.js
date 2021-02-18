import { StyleSheet } from "react-native";
import all_constants from "../constants";


export default StyleSheet.create({
    text_input_email_top: {
        top: 250,
    },
    text_input_pwd_top: {
        top: 310,
    },
    text_input: {
        height: 50,
        marginHorizontal: 10,
        marginVertical: 5,
        width: all_constants.screen.width - 30,
        textAlign: 'center',
        borderWidth: 1,
        position: 'absolute',
        fontSize: 15,
        color: 'white',
        borderRadius: 20
    },
    background: {
        left: 0,
        right: 0,
        top: 0,
        height: all_constants.screen.height + 150,  // value to check on devices
        alignItems: 'center',
        justifyContent: 'center',
    },
    star: {
        position: 'absolute',
        top: 60,
        width: 150,
        height: 150,
    },
    welcome_text: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        top: 210

    },
    login_button: {
        width:all_constants.screen.width - 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        height: 50,
        position: 'absolute',
        top: 400,
        borderRadius: 20,
    }
});
