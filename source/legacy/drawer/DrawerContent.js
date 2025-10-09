import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    ActivityIndicator,
    Drawer,
    Switch,
    Text,
    Title,
    TouchableRipple,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import CustomAlert from "../components/CustomAlert";
import all_constants from "../constants";
import { callBackEnd } from "../../api/callBackend";
import { getItemFromSecureStore } from "../helpers/global_helpers";
import { CommonActions } from "@react-navigation/native";
import { apiBaseUrl, port } from "../../env";

export default function DrawerContent(props) {
    const [
        isSwitchOn,
        setIsSwitchOn
    ] = React.useState(false);
    const [
        showAlert,
        setShowAlert
    ] = React.useState(false);
    const [
        online,
        isOnline
    ] = React.useState(false);
    const [
        userData,
        setUserData
    ] = React.useState(null);
    const [
        requesting,
        isRequesting
    ] = React.useState(true);
    const [
        showSignOutAlert,
        setShowSignOutAlert
    ] = React.useState(false);

    const resetNavigationStackToLoginView = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: "LoginForm" }
            ],
        });
        props.navigation.dispatch(resetAction);
    };

    async function patchStatus() {
        console.log("Updating status...");
        let formData = new FormData();
        formData.append("is_online", !online);
        const userID = await getItemFromSecureStore("userID");
        const access = await getItemFromSecureStore("accessToken");
        const response = await callBackEnd(
            formData,
            `${apiBaseUrl}:${port}/api/v1/cookers/${userID}/`,
            "PATCH",
            access,
            true,
        );
        console.log(response);

        if (response.ok) {
            isOnline(!online);
        }
    }

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        setShowAlert(!showAlert);
    };
    const [
        refreshData,
        setRefreshData
    ] = React.useState(false);

    const changeRefreshDataState = () => {
        setRefreshData(true);
        isRequesting(true);
    };

    async function getData() {
        const userID = await getItemFromSecureStore("userID");
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/cookers/${userID}/`,
            "GET",
            access,
        );

        setUserData(result.data);
        isRequesting(false);
        setRefreshData(false);
        isOnline(result.data.personal_infos_section.data.is_online);
    }

    React.useEffect(() => {
        if (requesting) {
            console.log("Fetching data to feed drawer content");
            getData();
        }

        return () => {
            isRequesting(false);
        };
    }, [
        refreshData
    ]);

    return (
        <View style={{ flex: 1 }}>
            {requesting
                ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator animating={true} color='tomato' />
                    </View>
                )
                : (
                    <DrawerContentScrollView {...props} persistentScrollbar={true}>
                        <Animated.View
                            style={[
                                styles.drawerContent,
                                {
                                    backgroundColor: "white",
                                },
                            ]}
                        >
                            {showSignOutAlert && (
                                <CustomAlert
                                    show={showSignOutAlert}
                                    title={all_constants.custom_alert.sign_out_title}
                                    message={all_constants.custom_alert.sign_out_message}
                                    confirmButtonColor='green'
                                    showCancelButton={true}
                                    cancelButtonColor='red'
                                    confirmText={all_constants.custom_alert.sign_out_confirm_text}
                                    cancelText={all_constants.custom_alert.sign_out_cancel_text}
                                    onConfirmPressed={() => {
                                        setShowSignOutAlert(false);
                                        resetNavigationStackToLoginView();
                                    }}
                                    onCancelPressed={() => {
                                        setShowSignOutAlert(false);
                                    }}
                                />
                            )}
                            {showAlert
                                ? (
                                    <CustomAlert
                                        show={showAlert}
                                        title={
                                            online
                                                ? all_constants.custom_alert.homeview.offline_title
                                                : all_constants.custom_alert.homeview.online_title
                                        }
                                        message={
                                            online
                                                ? all_constants.custom_alert.homeview.go_offline
                                                : all_constants.custom_alert.homeview.go_online
                                        }
                                        confirmButtonColor='green'
                                        showCancelButton={true}
                                        cancelButtonColor='red'
                                        cancelText={all_constants.custom_alert.homeview.cancel_text}
                                        onConfirmPressed={() => {
                                            patchStatus();
                                            setShowAlert(false);
                                        }}
                                        onCancelPressed={() => {
                                            setShowAlert(false);
                                        }}
                                    />
                                )
                                : (
                                    ""
                                )}
                            <View style={styles.userInfoSection}>
                                <TouchableOpacity
                                    style={{ marginLeft: 10 }}
                                    onPress={() => {
                                        props.navigation.toggleDrawer();
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: userData.personal_infos_section.data.photo,
                                        }}
                                        style={{ width: 70, height: 70, borderRadius: 150 / 2 }}
                                    />
                                </TouchableOpacity>
                                <Title style={styles.title}>
                                    {all_constants.drawercontent.hello}
                                    {userData.personal_infos_section.data.firstname}
                                </Title>
                            </View>

                            <Drawer.Section
                                title={all_constants.main_drawer_navigator.titles.acceptance_rate}
                                style={{ marginTop: "1%", marginRight: 15 }}
                            >
                                <TouchableRipple
                                    onPress={() => {
                                        props.navigation.navigate("AcceptanceRateInfosView");
                                    }}
                                >
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View
                                            style={{
                                                flex: 2,
                                                justifyContent: "center",
                                                paddingLeft: 20,
                                            }}
                                        >
                                            <Text>
                                                {
                                                    all_constants.drawercontent.drawer_item.label
                                                        .acceptance_rate
                                                }
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                paddingLeft: 20,
                                                flexDirection: "row",
                                            }}
                                        >
                                            {userData.personal_infos_section.data.acceptance_rate >=
                                            75 && (
                                                <MaterialCommunityIcons
                                                    name='checkbox-marked-circle'
                                                    size={24}
                                                    color='green'
                                                />
                                            )}
                                            {userData.personal_infos_section.data.acceptance_rate >=
                                            50 &&
                                            userData.personal_infos_section.data.acceptance_rate <
                                                75 && (
                                                <MaterialIcons
                                                    name='warning-amber'
                                                    size={24}
                                                    color='orange'
                                                />
                                            )}
                                            {userData.personal_infos_section.data.acceptance_rate <
                                            50 && (
                                                <MaterialIcons name='dangerous' size={24} color='red' />
                                            )}
                                            <Text
                                                style={[
                                                    {
                                                        color:
                                                        userData.personal_infos_section.data
                                                            .acceptance_rate >= 75
                                                            ? "green"
                                                            : userData.personal_infos_section.data
                                                                .acceptance_rate < 50
                                                                ? "red"
                                                                : "orange",
                                                    },
                                                    { fontWeight: "bold" },
                                                    { fontSize: 18 },
                                                ]}
                                            >
                                                {userData.personal_infos_section.data.acceptance_rate +
                                                "%"}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </Drawer.Section>

                            <Drawer.Section
                                title={all_constants.main_drawer_navigator.titles.visibility}
                                style={{ marginTop: "1%", marginRight: 15 }}
                            >
                                <TouchableRipple>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                paddingLeft: 20,
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    { color: online
                                                        ? "green"
                                                        : "red" },
                                                    { fontWeight: "bold" },
                                                ]}
                                            >
                                                {online
                                                    ? all_constants.label.home.status.online
                                                    : all_constants.label.home.status.offline}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Switch
                                                onValueChange={onToggleSwitch}
                                                value={online}
                                                color={"green"}
                                            />
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </Drawer.Section>
                            <Drawer.Section
                                title={all_constants.main_drawer_navigator.titles.dishes_management}
                            >
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name='food-turkey'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.create_dish}
                                    onPress={() => {
                                        props.navigation.navigate("DishForm", {
                                            item: {},
                                            new_item: true,
                                        });
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name='glass-cocktail'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.create_drink}
                                    onPress={() => {
                                        props.navigation.navigate("DrinkForm", {
                                            item: {},
                                            new_item: true,
                                        });
                                    }}
                                />
                            </Drawer.Section>
                            <Drawer.Section title={all_constants.main_drawer_navigator.titles.settings}>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name='account'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.account}
                                    onPress={() => {
                                        props.navigation.navigate("SettingsPersonalInformationForm", {
                                            item: userData.personal_infos_section.data,
                                            refreshDataStateChanger: changeRefreshDataState,
                                        });
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name='map-marker'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.localization}
                                    onPress={() => {
                                        props.navigation.navigate("SettingsAddressForm", {
                                            item: userData.address_section.data,
                                            refreshDataStateChanger: changeRefreshDataState,
                                        });
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name='history'
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.history}
                                    onPress={() => {
                                        props.navigation.navigate("OrdersHistory");
                                    }}
                                />
                            </Drawer.Section>

                            <Drawer.Section>
                                <DrawerItem
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons name='power' color='red' size={size} />
                                    )}
                                    label={() => (
                                        <Text style={{ color: "red", fontWeight: "bold" }}>
                                            {all_constants.drawercontent.logout}
                                        </Text>
                                    )}
                                    onPress={() => {
                                        setShowSignOutAlert(true);
                                    }}
                                />
                            </Drawer.Section>
                        </Animated.View>
                    </DrawerContentScrollView>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        marginBottom: "10%",
    },
    userInfoSection: {
        paddingLeft: "7%",
    },
    title: {
        marginTop: "2%",
        fontWeight: "bold",
    },
});
