import React from "react";

import { Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import all_constants from "../constants";

export default function AcceptanceRateInfosView() {
    const iconSize = 40;
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontStyle: "italic",
                        fontWeight: "bold",
                    }}
                >
                    {all_constants.acceptance_rate_infos_view.title}
                </Text>
            </View>

            <View
                style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "5%",
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        fontStyle: "italic",
                    }}
                >
                    {all_constants.acceptance_rate_infos_view.explanation}
                </Text>
            </View>

            <View
                style={{
                    flex: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "5%",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <MaterialCommunityIcons
                            name='checkbox-marked-circle'
                            size={iconSize}
                            color='green'
                        />
                    </View>
                    <View
                        style={{
                            flex: 4,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            {all_constants.acceptance_rate_infos_view.green_acceptance_rate}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <MaterialIcons name='warning-amber' size={iconSize} color='orange' />
                    </View>
                    <View
                        style={{
                            flex: 4,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            {all_constants.acceptance_rate_infos_view.orange_acceptance_rate}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <MaterialIcons name='dangerous' size={iconSize} color='red' />
                    </View>
                    <View
                        style={{
                            flex: 4,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            {all_constants.acceptance_rate_infos_view.red_acceptance_rate}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
