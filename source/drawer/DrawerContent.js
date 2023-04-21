import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
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
import { getUserSettings } from "../helpers/settings_helpers";

export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [online, isOnline] = React.useState(false); // TODO: this value will come from the back
  const [userData, getUserData] = React.useState(null);
  const [requesting, isRequesting] = React.useState(true);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setShowAlert(!showAlert);
  };

  React.useEffect(() => {
    if (requesting) {
      console.log("Fetching data to feed drawer content");
      async function getData() {
        const data = await getUserSettings();
        getUserData(data);
      }
      getData();
    }

    return () => {
      isRequesting(false);
    };
  }, [userData]);

  return (
    <View style={{ flex: 1 }}>
      {requesting ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator animating={true} color="tomato" />
        </View>
      ) : (
        <DrawerContentScrollView {...props}>
          <Animated.View
            style={[
              styles.drawerContent,
              {
                backgroundColor: paperTheme.colors.surface,
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
                <Avatar.Image
                  source={require("../images/mum_test.jpg")}
                  size={60}
                />
              </TouchableOpacity>
              <Title style={styles.title}>
                Bonjour{" "}
                {userData["personal_infos_section"]["data"]["firstname"]}
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
                    <Switch onValueChange={onToggleSwitch} value={online} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
            <Drawer.Section title="Gérer">
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="food-turkey"
                    color={color}
                    size={size}
                  />
                )}
                label="Ajouter un plat"
                onPress={() => {
                  props.navigation.navigate("DishFormView", {
                    item: userData["order_infos_section"]["data"],
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="percent"
                    color={color}
                    size={size}
                  />
                )}
                label="Créer une promotion"
                onPress={() => {
                  props.navigation.navigate("OfferFormView", {
                    item: userData["order_infos_section"]["data"],
                  });
                }}
              />
            </Drawer.Section>
            <Drawer.Section title="Préférences">
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="lock"
                    color={color}
                    size={size}
                  />
                )}
                label="Connexion"
                onPress={() => {
                  props.navigation.navigate("SettingsCredentialsForm", {
                    item: userData["credential_infos_section"]["data"],
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="basket"
                    color={color}
                    size={size}
                  />
                )}
                label="Commandes"
                onPress={() => {
                  props.navigation.navigate("SettingsOrderInformationForm", {
                    item: userData["order_infos_section"]["data"],
                  });
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                )}
                label="Compte"
                onPress={() => {
                  props.navigation.navigate("SettingsPersonalInformationForm", {
                    item: userData["personal_infos_section"]["data"],
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
                label="Localisation"
                onPress={() => {
                  props.navigation.navigate("SettingsAddressForm", {
                    item: userData["address_section"]["data"],
                  });
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
    paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
