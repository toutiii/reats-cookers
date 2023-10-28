import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  useTheme,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import CustomAlert from "../components/CustomAlert";
import all_constants from "../constants";
import { callBackEndGET } from "../api/callBackend";

export default function DrawerContent(props) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [online, isOnline] = React.useState(false); // TODO: this value will come from the back
  const [userData, setUserData] = React.useState(null);
  const [requesting, isRequesting] = React.useState(true);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setShowAlert(!showAlert);
  };
  const [refreshData, setRefreshData] = React.useState(false);

  const changeRefreshDataState = () => {
    setRefreshData(true);
    isRequesting(true);
  };

  React.useEffect(() => {
    if (requesting) {
      console.log("Fetching data to feed drawer content");
      async function getData() {
        const result = await callBackEndGET(
          "http://192.168.1.85:8000/api/v1/cookers/1/"
        );
        setUserData(result.data);
        isRequesting(false);
        setRefreshData(false);
      }
      getData();
    }

    return () => {
      isRequesting(false);
    };
  }, [refreshData]);

  return (
    <View style={{ flex: 1 }}>
      {requesting ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} color="tomato" />
        </View>
      ) : (
        <DrawerContentScrollView {...props}>
          <Animated.View
            style={[
              styles.drawerContent,
              {
                backgroundColor: "white",
              },
            ]}
          >
            {showAlert ? (
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
                confirmButtonColor="green"
                showCancelButton={true}
                cancelButtonColor="red"
                cancelText={all_constants.custom_alert.homeview.cancel_text}
                onConfirmPressed={() => {
                  isOnline(!online);
                  setShowAlert(false);
                }}
                onCancelPressed={() => {
                  isOnline(online);
                  setShowAlert(false);
                }}
              />
            ) : (
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
              title="Visibilité"
              style={{ marginTop: "4%", marginRight: 15 }}
            >
              <TouchableRipple
                onPress={() => {
                  console.log("Hi");
                }}
              >
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
                        { color: online ? "green" : "red" },
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
            <Drawer.Section title="Gestion">
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="food-turkey"
                    color={color}
                    size={size}
                  />
                )}
                label={
                  all_constants.drawercontent.drawer_item.label.create_dish
                }
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
                    name="glass-cocktail"
                    color={color}
                    size={size}
                  />
                )}
                label={
                  all_constants.drawercontent.drawer_item.label.create_drink
                }
                onPress={() => {
                  props.navigation.navigate("DrinkForm", {
                    item: {},
                    new_item: true,
                  });
                }}
              />
            </Drawer.Section>
            <Drawer.Section title="Préférences">
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
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
                    name="map-marker"
                    color={color}
                    size={size}
                  />
                )}
                label={
                  all_constants.drawercontent.drawer_item.label.localization
                }
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
                    name="history"
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
                  <MaterialCommunityIcons
                    name="power"
                    color="red"
                    size={size}
                  />
                )}
                label={() => (
                  <Text style={{ color: "red", fontWeight: "bold" }}>
                    {all_constants.drawercontent.logout}
                  </Text>
                )}
                onPress={() => {}}
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
  },
  userInfoSection: {
    paddingLeft: "7%",
  },
  title: {
    marginTop: "2%",
    fontWeight: "bold",
  },
});
