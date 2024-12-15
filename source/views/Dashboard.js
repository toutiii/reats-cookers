import React, { useRef } from "react";
import { Animated, Button, RefreshControl, SafeAreaView, View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import all_constants from "../constants";
import { callBackEnd } from "../api/callBackend";
import { getItemFromSecureStore } from "../helpers/global_helpers";
import { apiBaseUrl, port } from "../env";
import { Divider } from "react-native-paper";

export default function Dashboard() {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [
        refreshing,
        setRefreshing
    ] = React.useState(false);
    const [
        isModalVisible,
        setModalVisible
    ] = React.useState(false);
    const [
        fetchedPieData,
        setFetchedPieData
    ] = React.useState([
    ]);

    function feedPieData(ordersCountObject) {
        let tempPieData = [
        ];
        for (let [
            key,
            value
        ] of Object.entries(ordersCountObject)) {
            if (key === "pending") {
                tempPieData.push({
                    value: value,
                    color: "orange",
                    gradientCenterColor: "white",
                    legend: all_constants.dashboard.mapping.pending,
                });
            } else if (key === "processing") {
                tempPieData.push({
                    value: value,
                    color: "tomato",
                    gradientCenterColor: "white",
                    legend: all_constants.dashboard.mapping.processing,
                });
            } else if (key === "completed") {
                tempPieData.push({
                    value: value,
                    color: "green",
                    gradientCenterColor: "white",
                    legend: all_constants.dashboard.mapping.completed,
                });
            } else if (key === "delivered") {
                tempPieData.push({
                    value: value,
                    color: "grey",
                    gradientCenterColor: "white",
                    legend: all_constants.dashboard.mapping.delivered,
                });
            }
        }
        setFetchedPieData(tempPieData);
    }

    function getLastMondayAndTodayInISO() {
        // Get the current date
        const today = new Date();

        // Calculate the day difference to the last Monday
        const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
        const daysSinceMonday = (dayOfWeek === 0
            ? 7
            : dayOfWeek) - 1; // Adjust for Sunday being 0
        const lastMonday = new Date(today);
        lastMonday.setDate(today.getDate() - daysSinceMonday);

        // Set both dates to midnight for consistency
        lastMonday.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        // Convert to ISO format
        const lastMondayISO = lastMonday.toISOString();
        const currentDayISO = today.toISOString();

        return { lastMondayISO, currentDayISO };
    }

    async function getOrdersCountToFeedPieData() {
        const { lastMondayISO, currentDayISO } = getLastMondayAndTodayInISO();

        const access = await getItemFromSecureStore("accessToken");
        const formData = new FormData();
        const response = await callBackEnd(
            formData,
            `${apiBaseUrl}:${port}/api/v1/cookers-dashboard/?start_date=${lastMondayISO}&end_date=${currentDayISO}`,
            "GET",
            access,
            false,
            null,
        );
        feedPieData(response.data);
    }

    React.useEffect(() => {
        getOrdersCountToFeedPieData();
    }, [
    ]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            getOrdersCountToFeedPieData();
            setRefreshing(false);
        }, 200);
    }, [
        refreshing
    ]);

    const renderDot = (color) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        console.log(fetchedPieData);
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {fetchedPieData.map((data, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: "3%",
                            width: 200,
                        }}
                    >
                        {renderDot(data.color)}
                        <Text style={{ color: "white" }}>
                            {data.value} {data.legend}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animated.ScrollView
                style={{
                    backgroundColor: "white",
                    flex: 1,
                    opacity: fadeAnim,
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isModalVisible && (
                    <Modal
                        testID={"modal"}
                        isVisible={isModalVisible}
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
                                    onPress={toggleModal}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 2,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ fontSize: 16, textAlign: "center" }}>
                                    {all_constants.dashboard.scroll_update}
                                </Text>
                            </View>
                        </View>
                    </Modal>
                )}
                <TouchableRipple onPress={toggleModal} rippleColor='yellow'>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons
                            name='information-outline'
                            color={"#232B5D"}
                            size={35}
                        />
                    </View>
                </TouchableRipple>

                <View style={{ flex: 1, marginTop: "5%" }}>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
                        {all_constants.dashboard.stats.title}
                    </Text>
                </View>

                <Divider bold={true} margin={"5%"} />

                {Object.keys(fetchedPieData).length !== 0
                    ? (
                        <View
                            style={{
                                marginTop: "10%",
                                marginRight: "5%",
                                marginLeft: "5%",
                                borderRadius: 20,
                                backgroundColor: "#232B5D",
                                flex: 1,
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                                    {all_constants.dashboard.titles.orders}
                                </Text>
                            </View>

                            <View style={{ alignItems: "center" }}>
                                <PieChart
                                    data={fetchedPieData}
                                    donut
                                    showGradient
                                    focusOnPress={true}
                                    radius={90}
                                    innerRadius={60}
                                    innerCircleColor={"white"}
                                />
                            </View>

                            {renderLegendComponent()}
                        </View>
                    )
                    : (
                        <View
                            style={{
                                flex: 1,
                                marginTop: "50%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 16,
                                }}
                            >
                                {all_constants.dashboard.no_data}
                            </Text>
                        </View>
                    )}
            </Animated.ScrollView>
        </SafeAreaView>
    );
}
