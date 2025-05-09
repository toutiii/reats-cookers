import React from "react";
import { Animated, FlatList, Text, TouchableHighlight, View } from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Order from "../components/Order";
import { getItemFromSecureStore } from "../helpers/global_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";
import { useFocusEffect } from "@react-navigation/native";

export default function OrdersFlatlist(props) {
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const queryFilter = props.route.params.filter;
    const [
        isFetchingData,
        setIsFetchingData
    ] = React.useState(true);
    const [
        data,
        setData
    ] = React.useState(null);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 400,
            useNativeDriver: true,
        }).start();
    };

    async function fetchDataFromBackend() {
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/cookers-orders/?status=${queryFilter}`,
            "GET",
            access,
        );

        setData(result.data);
        console.log("result.data :", result.data);
    }

    React.useEffect(() => {
        if (isFetchingData) {
            fadeOut();
            fetchDataFromBackend();
            setIsFetchingData(false);
            fadeIn();
        }
    }, [
        isFetchingData
    ]);

    useFocusEffect(
        React.useCallback(() => {
            setIsFetchingData(true);
            fadeOut();
            fetchDataFromBackend();
            setIsFetchingData(false);
            fadeIn();
        }, [
        ]),
    );

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}
            >
                <FlatList
                    data={data}
                    onRefresh={() => {
                        setIsFetchingData(true);
                    }}
                    refreshing={isFetchingData}
                    ItemSeparatorComponent={
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#C8C8C8",
                                height: 2.5,
                                marginLeft: "10%",
                                marginRight: "10%",
                                marginTop: "5%",
                            }}
                        />
                    }
                    ListEmptyComponent={
                        !isFetchingData &&
                        data !== null &&
                        data.length === 0 && (
                            <View
                                style={{
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .no_results
                                    }
                                </Text>
                            </View>
                        )
                    }
                    renderItem={({ item }) => (
                        <View style={styles_order.order_button_container}>
                            <TouchableHighlight
                                onPress={() => {
                                    props.navigation.navigate("OrderDetailView", {
                                        item: item,
                                    });
                                }}
                                style={{ flex: 1 }}
                                underlayColor={all_constants.colors.inputBorderColor}
                            >
                                <Order
                                    total_amount={item.total_amount}
                                    order_number={item.id}
                                    order_status={item.status}
                                    order_date={item.created}
                                    order_processing_date={item.processing_date}
                                    order_final_state_date={item.modified}
                                    nb_of_items={
                                        item.dishes_items.length + item.drinks_items.length
                                    }
                                />
                            </TouchableHighlight>
                        </View>
                    )}
                />
            </View>
        </Animated.View>
    );
}
