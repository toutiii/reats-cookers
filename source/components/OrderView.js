/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Animated, View, Text } from "react-native";
import styles_order_view from "../styles/styles-order-view";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import DishModal from "../modals/DishModal";
import { AntDesign, FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr"; // Import French locale
import CustomAlert from "./CustomAlert";
import { getItemFromSecureStore } from "../helpers/global_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";

export default function OrderView(props) {
    // State for modal visibility
    const [
        modalVisible,
        setModalVisible
    ] = useState(false);

    // Set locale for moment.js
    useEffect(() => {
        moment.locale("fr");
    }, [
    ]);

    // Icon size
    const iconSize = 25;
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    // Handlers for modal visibility

    const onPressShowModal = () => setModalVisible(true);

    const onPressCloseModal = () => setModalVisible(false);

    const [
        showDeclineOrderAlert,
        setShowDeclineOrderAlert
    ] = useState(false);

    const [
        showCancelOrderAlert,
        setShowCancelOrderAlert
    ] = useState(false);

    const [
        showCancelOrderSuccessAlert,
        setShowCancelOrderSuccessAlert
    ] = useState(false);

    const [
        showCancelOrderFailureAlert,
        setShowCancelOrderFailureAlert
    ] = useState(false);

    const [
        isUpdatingOrder,
        setIsUpdatingOrder
    ] = useState(false);

    const [
        orderHasBeenCancelled,
        setOrderHasBeenCancelled
    ] = useState(false);

    const [
        showAcceptOrderAlert,
        setShowAcceptOrderAlert
    ] = useState(false);

    const [
        showAcceptOrderSuccessAlert,
        setShowAcceptOrderSuccessAlert
    ] = useState(false);

    const [
        showAcceptOrderFailureAlert,
        setShowAcceptOrderFailureAlert
    ] = useState(false);

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Extracting item data from props
    const { item } = props.route.params;

    async function guessOrderNewStatus() {
        let newStatus = "";
        switch (item.status) {
        case all_constants.drawercontent.drawer_item.orders_history.original_status.pending:
            newStatus = orderHasBeenCancelled
                ? all_constants.drawercontent.drawer_item.orders_history.original_status
                    .cancelled_by_cooker
                : all_constants.drawercontent.drawer_item.orders_history.original_status
                    .processed;
            break;

        case all_constants.drawercontent.drawer_item.orders_history.original_status.processed:
            newStatus = orderHasBeenCancelled
                ? all_constants.drawercontent.drawer_item.orders_history.original_status
                    .cancelled_by_cooker
                : all_constants.drawercontent.drawer_item.orders_history.original_status
                    .completed;
            break;

        default:
            break;
        }
        return newStatus;
    }

    async function updateOrderStatus() {
        const access = await getItemFromSecureStore("accessToken");
        const formData = new FormData();
        const orderNewStatus = await guessOrderNewStatus();
        formData.append("status", orderNewStatus);

        const result = await callBackEnd(
            formData,
            `${apiBaseUrl}:${port}/api/v1/cookers-orders/${item.id}/`,
            "PATCH",
            access,
            true,
        );

        if (result) {
            if (orderHasBeenCancelled) {
                setShowCancelOrderSuccessAlert(true);
            } else {
                setShowAcceptOrderSuccessAlert(true);
            }
        } else {
            if (orderHasBeenCancelled) {
                setShowCancelOrderFailureAlert(true);
            } else {
                setShowAcceptOrderFailureAlert(true);
            }
        }

        setOrderHasBeenCancelled(false);
    }

    useEffect(() => {
        if (isUpdatingOrder) {
            fadeOut();
            setTimeout(() => {
                updateOrderStatus();
                setIsUpdatingOrder(false);

                fadeIn();
            }, 300);
        }
    }, [
        isUpdatingOrder
    ]);

    return (
        <Animated.View style={{ flex: 1, backgroundColor: "white", opacity: fadeAnim }}>
            {modalVisible && (
                <DishModal
                    state={modalVisible}
                    onPressCloseModal={onPressCloseModal}
                    modal_data={item.items}
                />
            )}
            {isUpdatingOrder && (
                <View
                    style={{
                        backgroundColor: "white",
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size='large' color='tomato' />
                </View>
            )}

            {showDeclineOrderAlert && (
                <CustomAlert
                    show={showDeclineOrderAlert}
                    title={all_constants.pending_orders_view.decline.title}
                    message={all_constants.pending_orders_view.decline.message}
                    showCancelButton={true}
                    confirmButtonColor={"red"}
                    cancelButtonColor={"green"}
                    confirmText={all_constants.messages.decline}
                    cancelText={all_constants.messages.quit}
                    onConfirmPressed={() => {
                        setShowDeclineOrderAlert(false);
                        setOrderHasBeenCancelled(true);
                        setIsUpdatingOrder(true);
                    }}
                    onCancelPressed={() => {
                        setShowDeclineOrderAlert(false);
                    }}
                />
            )}
            {showCancelOrderAlert && (
                <CustomAlert
                    show={showCancelOrderAlert}
                    title={all_constants.pending_orders_view.cancel.title}
                    message={all_constants.pending_orders_view.cancel.message}
                    showCancelButton={true}
                    confirmButtonColor={"red"}
                    cancelButtonColor={"green"}
                    confirmText={all_constants.messages.cancel_order}
                    cancelText={all_constants.messages.quit}
                    onConfirmPressed={() => {
                        setShowCancelOrderAlert(false);
                        setOrderHasBeenCancelled(true);
                        setIsUpdatingOrder(true);
                    }}
                    onCancelPressed={() => {
                        setShowCancelOrderAlert(false);
                    }}
                />
            )}
            {showAcceptOrderAlert && (
                <CustomAlert
                    show={showAcceptOrderAlert}
                    title={all_constants.pending_orders_view.accept.title}
                    message={all_constants.pending_orders_view.accept.message}
                    showCancelButton={true}
                    confirmButtonColor={"green"}
                    cancelButtonColor={"red"}
                    confirmText={all_constants.messages.accept}
                    cancelText={all_constants.messages.quit}
                    onConfirmPressed={() => {
                        setShowAcceptOrderAlert(false);
                        setIsUpdatingOrder(true);
                    }}
                    onCancelPressed={() => {
                        setShowAcceptOrderAlert(false);
                    }}
                />
            )}
            {showCancelOrderSuccessAlert && (
                <CustomAlert
                    show={showCancelOrderSuccessAlert}
                    title={all_constants.pending_orders_view.cancel.success.title}
                    message={all_constants.pending_orders_view.cancel.success.message}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        setShowCancelOrderSuccessAlert(false);
                        props.navigation.goBack();
                    }}
                />
            )}
            {showCancelOrderFailureAlert && (
                <CustomAlert
                    show={showCancelOrderFailureAlert}
                    title={all_constants.pending_orders_view.cancel.failure.title}
                    message={all_constants.pending_orders_view.cancel.failure.message}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowCancelOrderFailureAlert(false);
                        props.navigation.goBack();
                    }}
                />
            )}
            {showAcceptOrderSuccessAlert && (
                <CustomAlert
                    show={showAcceptOrderSuccessAlert}
                    title={all_constants.pending_orders_view.accept.success.title}
                    message={all_constants.pending_orders_view.accept.success.message}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        setShowAcceptOrderSuccessAlert(false);
                        props.navigation.goBack();
                    }}
                />
            )}
            {showAcceptOrderFailureAlert && (
                <CustomAlert
                    show={showAcceptOrderFailureAlert}
                    title={all_constants.pending_orders_view.accept.failure.title}
                    message={all_constants.pending_orders_view.accept.failure.message}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowAcceptOrderFailureAlert(false);
                        props.navigation.goBack();
                    }}
                />
            )}
            <View style={{ flex: 4, backgroundColor: "white" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            {all_constants.drawercontent.drawer_item.orders_history.infos.number}
                            {item.id}
                        </Text>
                    </View>

                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <MaterialIcons name='shopping-cart' size={iconSize} color='black' />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.status
                                        .ordered
                                }{" "}
                                {moment(item.created).format("dddd DD MMM à HH[h]mm")}
                            </Text>
                        </View>
                    </View>

                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <AntDesign name='user' size={iconSize} color='black' />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.infos
                                        .ordered_by
                                }{" "}
                                {item.customer.firstname} {item.customer.lastname.substring(0, 1)}.
                            </Text>
                        </View>
                    </View>

                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <FontAwesome name='euro' size={iconSize} color='black' />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.infos
                                        .amount
                                }
                                {item.total_amount} {all_constants.currency_symbol}
                            </Text>
                        </View>
                    </View>
                    {item.status ===
                        all_constants.drawercontent.drawer_item.orders_history.original_status
                            .delivered && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons
                                    name='delivery-dining'
                                    size={iconSize}
                                    color='green'
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.delivered
                                    }{" "}
                                    {moment(item.delivery_date).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
                        all_constants.drawercontent.drawer_item.orders_history.original_status
                            .pending && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons
                                    name='timer-sand'
                                    size={iconSize}
                                    color='black'
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.pending
                                    }
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
                        all_constants.drawercontent.drawer_item.orders_history.original_status
                            .cancelled_by_cooker && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name='cancel' size={iconSize} color='red' />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.cancelled_by_cooker
                                    }
                                    {moment(item.modified).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
                        all_constants.drawercontent.drawer_item.orders_history.original_status
                            .cancelled_by_customer && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name='cancel' size={iconSize} color='red' />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.cancelled_by_customer
                                    }
                                    {moment(item.modified).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
                        all_constants.drawercontent.drawer_item.orders_history.original_status
                            .processed && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons
                                    name='food-turkey'
                                    size={iconSize}
                                    color='black'
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.processed
                                    }{" "}
                                    {moment(item.processing_date).format("dddd DD MMM à HH[h]mm")}
                                </Text>
                            </View>
                        </View>
                    )}
                    {item.status ===
                        all_constants.drawercontent.drawer_item.orders_history.original_status
                            .completed && (
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name='done' size={24} color='green' />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.completed
                                    }
                                </Text>
                            </View>
                        </View>
                    )}
                    <View style={styles_order_view.order_item_info}>
                        <View style={{ flex: 1 }}>
                            <MaterialCommunityIcons
                                name='google-maps'
                                size={iconSize}
                                color='black'
                            />
                        </View>
                        <View style={{ flex: 6 }}>
                            <Text style={{ fontSize: 17 }}>
                                {item.address.postal_code} {item.address.town}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {item.status ===
                all_constants.drawercontent.drawer_item.orders_history.original_status.pending && (
                <View style={{ flex: 2.2, alignItems: "center" }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.pending_orders_view.button_label.accept_order}
                            backgroundColor='green'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={() => {
                                setShowAcceptOrderAlert(true);
                            }}
                            label_color='white'
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.modal.dish_modal.show}
                            backgroundColor='darkgrey'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={onPressShowModal}
                            label_color='white'
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.pending_orders_view.button_label.decline_order}
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            backgroundColor={"red"}
                            label_color={"white"}
                            button_width={all_constants.screen.width - 40}
                            onPress={() => {
                                setShowDeclineOrderAlert(true);
                            }}
                        />
                    </View>
                </View>
            )}

            {item.status ===
                all_constants.drawercontent.drawer_item.orders_history.original_status
                    .processed && (
                <View style={{ flex: 1.5, alignItems: "center" }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.modal.dish_modal.show}
                            backgroundColor='darkgrey'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={onPressShowModal}
                            label_color='white'
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.pending_orders_view.button_label.cancel_order}
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            backgroundColor={"red"}
                            label_color={"white"}
                            button_width={all_constants.screen.width - 40}
                            onPress={() => {
                                setShowCancelOrderAlert(true);
                            }}
                        />
                    </View>
                </View>
            )}

            {(item.status ===
                all_constants.drawercontent.drawer_item.orders_history.original_status.delivered ||
                item.status ===
                    all_constants.drawercontent.drawer_item.orders_history.original_status
                        .cancelled_by_cooker ||
                item.status ===
                    all_constants.drawercontent.drawer_item.orders_history.original_status
                        .cancelled_by_customer ||
                item.status ===
                    all_constants.drawercontent.drawer_item.orders_history.original_status
                        .completed) && (
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: "2%",
                        }}
                    >
                        <CustomButton
                            label={all_constants.modal.dish_modal.show}
                            backgroundColor='darkgrey'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={onPressShowModal}
                            label_color='white'
                        />
                    </View>
                </View>
            )}
        </Animated.View>
    );
}
