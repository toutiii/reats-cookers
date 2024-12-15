import { StyleSheet } from "react-native";
import all_constants from "../constants";

let styles = StyleSheet.create({
    text_input: {
        top: -130,
        height: 50,
        width: all_constants.screen.width - 30,
        textAlign: "center",
        borderWidth: 1,
        fontSize: 15,
        color: "white",
        borderRadius: 20,
    },
    background: {
        left: 0,
        right: 0,
        top: 0,
        height: all_constants.screen.height + 150, // value to check on devices
        alignItems: "center",
        justifyContent: "center",
    },
    star: {
        position: "absolute",
        top: 40,
        width: 150,
        height: 150,
    },
    welcome_text: {
        position: "absolute",
        color: "white",
        fontSize: 20,
        top: 180,
    },
    login_button: {
        alignItems: "center",
        justifyContent: "center",
    },

    image_style: {
        top: -85,
        left: 15,
        padding: 10,
        height: 23,
        width: 23,
    },
});

export default styles;
