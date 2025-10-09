import React from "react";
import { ScrollView, Text, View } from "react-native";
import HorizontalLine from "./HorizontalLine";

export default function Setting({ ...props }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", width: "95%" }}>
            {props.label && !props.label.includes("photo") && (
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, justifyContent: "center", marginTop: "5%" }}>
                        <ScrollView horizontal={true}>
                            <Text numberOfLines={1} style={{ fontSize: 18 }}>
                                {props.label}
                            </Text>
                        </ScrollView>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "flex-end",
                            marginTop: "5%",
                        }}
                    >
                        <ScrollView horizontal={true}>
                            <Text numberOfLines={1} style={{ fontSize: 18 }}>
                                {props.value}
                            </Text>
                            <HorizontalLine />
                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    );
}
