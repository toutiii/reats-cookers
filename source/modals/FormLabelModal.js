import { Animated, Button, View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import all_constants from "../constants";

export default function FormLabelModal({ ...props }) {
    console.log(props.state);

    return (
        <Animated.View
            style={{
                backgroundColor: "white",
                flex: 1,
            }}
        >
            <Modal
                testID={"modal"}
                isVisible={props.state}
                backdropOpacity={0.8}
                animationIn='zoomInDown'
                animationOut='zoomOutUp'
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={all_constants.modal.dish_modal.hide}
                            onPress={props.onPressCloseModal}
                        />
                    </View>

                    <View
                        style={{
                            flex: 2,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ fontSize: 16, textAlign: "center" }}>
                            {props.labelModalText}
                        </Text>
                    </View>
                </View>
            </Modal>
        </Animated.View>
    );
}
