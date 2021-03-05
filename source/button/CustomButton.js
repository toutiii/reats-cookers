import {Text, TouchableHighlight} from "react-native";
import styles from "../styles/styles";
import React from "react";
import all_constants from "../constants";


export default function CustomButton ({label, ...props}) {
    return (
        <TouchableHighlight
            underlayColor={all_constants.colors.inputBorderColor}
            {...props}
            style={
                [
                    styles.login_button,
                    {height: props.height},
                    {top: props.top},
                    {borderWidth: props.border_width},
                    {borderRadius: props.border_radius},
                    {backgroundColor: props.backgroundColor? props.backgroundColor : 'transparent'}
                ]
            }
        >
            <Text style={{ color:props.label_color, fontSize: props.font_size }}>{label}</Text>
        </TouchableHighlight>
    )
}