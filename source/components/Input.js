import React from "react";
import { Image, TextInput, View } from "react-native";
import styles from "../styles/styles.js";
import all_constants from "../constants";

export default function Input(props) {
    return (
        <View>
            <Image source={{ uri: props.icon_uri }} style={styles.image_style} />
            <TextInput
                style={[
                    styles.text_input,
                    { fontStyle: props.value
                        ? "normal"
                        : "italic" },
                    {
                        borderColor: props.focus
                            ? all_constants.colors.inputBorderColor
                            : "white",
                    },
                    { margin: 10 },
                ]}
                {...props}
            />
        </View>
    );
}
