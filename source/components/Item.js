import { Image, Text, View } from "react-native";
import styles_dish from "../styles/styles-dish";
import all_constants from "../constants";
import React from "react";

export default function Item({ ...props }) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 5 }}>
                <View style={styles_dish.dish_name}>
                    {props.is_enabled
                        ? (
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 20,
                                }}
                            >
                                {" "}
                                {props.name}{" "}
                            </Text>
                        )
                        : (
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 20,
                                    textDecorationLine: "line-through",
                                    textDecorationStyle: "solid",
                                    color: "red",
                                }}
                            >
                                {" "}
                                {props.name}{" "}
                            </Text>
                        )}
                </View>
                <View style={{ flex: 4 }}>
                    <Image
                        source={{
                            uri: props.photo,
                        }}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={styles_dish.dish_price}>
                            <Text style={{ fontSize: 20 }}> {props.price} </Text>
                        </View>
                        <View style={styles_dish.dish_rating}>
                            <Image
                                source={{ uri: all_constants.uri.rating_star }}
                                style={styles_dish.rating_star}
                            />
                            <Text style={{ fontSize: 14 }}> {props.rating} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
