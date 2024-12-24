import React from "react";
import { Animated, FlatList, Image, Text, TouchableHighlight, View } from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Order from "../components/Order";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import SearchFilterModal from "../modals/SearchFilterModal.js";
import CustomAlert from "../components/CustomAlert.js";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";
import { getItemFromSecureStore } from "../helpers/global_helpers";

export default function OrdersHistoryFlatList({ ...props }) {
    const [
        isSearchFilterModalVisible,
        setSearchFilterModalVisible
    ] = React.useState(false);

    const [
        startDate,
        setStartDate
    ] = React.useState(null);
    const [
        endDate,
        setEndDate
    ] = React.useState(null);
    const fadeAnim = React.useRef(new Animated.Value(1)).current;
    const [
        isFetchingData,
        setIsFetchingData
    ] = React.useState(false);
    const [
        data,
        setData
    ] = React.useState([
    ]);
    const [
        runSearchByTextInput,
        setRunSearchByTextInput
    ] = React.useState(false);
    const [
        dateCheckingOk,
        setIsDateCheckingOk
    ] = React.useState(true);
    const [
        showAlert,
        setShowAlert
    ] = React.useState(false);
    const [
        selectedOrderState,
        setSelectedOrderState
    ] = React.useState(null);

    const minLengthToTriggerSearch = 3;
    const maxInputLength = 100;
    const delaySearch = 2000;

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

    const toggleSearchFilterModal = () => {
        setSearchFilterModalVisible(!isSearchFilterModalVisible);
    };

    const [
        searchQuery,
        setSearchQuery
    ] = React.useState("");

    const onChangeSearch = (query) => {
        console.log(query);
        if (query.length === 0) {
            setSearchQuery("");
        }

        if (
            query.length > 0 &&
            query.length <= maxInputLength &&
            query.charCodeAt(query.slice(-1)) <= 127
        ) {
            setSearchQuery(query.replace("  ", ""));
        }

        if (query.replace("  ", "").replace(" ", "").length >= minLengthToTriggerSearch) {
            setRunSearchByTextInput(true);
        }
    };

    const updateSearchingStatus = () => {
        setIsFetchingData(!isFetchingData);
    };

    async function fetchDataFromBackend() {
        let baseURL = `${apiBaseUrl}:${port}/api/v1/cookers-orders-history/`;

        if (startDate !== null && endDate !== null) {
            const formattedStartDate =
                new Date(startDate).toISOString().split("T")[0] + "T00:00:00.000Z";
            const formattedEndDate =
                new Date(endDate).toISOString().split("T")[0] + "T00:00:00.000Z";
            baseURL += `?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
        }

        if (selectedOrderState !== null) {
            baseURL += `?status=${selectedOrderState}`;
        }

        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(new FormData(), baseURL, "GET", access, true, null);

        setData(result.data);
        console.log("result.data :", result.data);
    }

    React.useEffect(() => {
        setIsFetchingData(true);
        fadeOut();

        setTimeout(() => {
            fetchDataFromBackend();
            setIsFetchingData(false);
            fadeIn();
        }, 500);
    }, [
    ]);

    React.useEffect(() => {
        if (isFetchingData && dateCheckingOk) {
            fadeOut();

            setTimeout(() => {
                fetchDataFromBackend();
                updateSearchingStatus();
                resetFilters();
                setRunSearchByTextInput(false);
                fadeIn();
            }, 500);
        }
    }, [
        isFetchingData
    ]);

    React.useEffect(() => {
        if (runSearchByTextInput) {
            const delayDebounceFn = setTimeout(() => {
                updateSearchingStatus();
            }, delaySearch);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [
        runSearchByTextInput
    ]);

    const checkDates = () => {
        if (startDate !== null && endDate !== null && startDate > endDate) {
            setShowAlert(true);
            setIsDateCheckingOk(false);
        } else {
            setIsDateCheckingOk(true);
        }
    };

    const onPressFilter = () => {
        checkDates();
        toggleSearchFilterModal();

        if (selectedOrderState !== null || startDate !== null || endDate !== null) {
            console.log(startDate);
            console.log(endDate);
            console.log(selectedOrderState);
            updateSearchingStatus();
        }
    };

    const resetFilters = () => {
        setSelectedOrderState(null);
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}>
            {isSearchFilterModalVisible && (
                <SearchFilterModal
                    enableOrderStateFilter={true}
                    enableStartDateFilter={true}
                    enableEndDateFilter={true}
                    pickStartDate={setStartDate}
                    pickEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                    stateOrderData={setSelectedOrderState}
                    isModalVisible={isSearchFilterModalVisible}
                    toggleModal={toggleSearchFilterModal}
                    onPressFilter={onPressFilter}
                    onPressClear={resetFilters}
                />
            )}

            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                }}
            >
                <View style={{ flex: 4 }}>
                    <Searchbar
                        placeholder={all_constants.search_bar.placeholder}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableRipple
                        onPress={toggleSearchFilterModal}
                        rippleColor='rgba(0, 0, 0, .32)'
                    >
                        <Image
                            source={require("../images/filtre.png")}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableRipple>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}
            >
                {!dateCheckingOk && (
                    <CustomAlert
                        show={showAlert}
                        title={all_constants.search_modal.alert.date.title}
                        message={all_constants.search_modal.alert.date.message}
                        confirmButtonColor='red'
                        onConfirmPressed={() => {
                            setShowAlert(false);
                            setIsDateCheckingOk(true);
                            setIsFetchingData(false);
                        }}
                    />
                )}

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
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>
                                {all_constants.drawercontent.drawer_item.orders_history.no_results}
                            </Text>
                        </View>
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
                                    dishes_number={item.items.length}
                                />
                            </TouchableHighlight>
                        </View>
                    )}
                />
            </View>
        </Animated.View>
    );
}
