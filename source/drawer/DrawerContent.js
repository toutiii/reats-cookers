import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Drawer,
  Switch,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import CustomAlert from "../components/CustomAlert";
import all_constants from "../constants";

export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [online, isOnline] = React.useState(false); // TODO: this value will come from the back

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setShowAlert(!showAlert);
  };

  return (
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
            title={all_constants.custom_alert.homeview.title}
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

        <Drawer.Section title="Cuisine">
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="food-turkey"
                color={color}
                size={size}
              />
            )}
            label="Mes plats"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="food" color={color} size={size} />
            )}
            label="Mes menus"
            onPress={() => {}}
          />
        </Drawer.Section>

        <Drawer.Section title="Marketing">
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="percent"
                color={color}
                size={size}
              />
            )}
            label="Mes promotions"
            onPress={() => {}}
          />
        </Drawer.Section>

        <Drawer.Section title="Préférences">
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="lock" color={color} size={size} />
            )}
            label="Connexion"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="basket" color={color} size={size} />
            )}
            label="Commandes"
            onPress={() => {}}
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
            onPress={() => {}}
          />
        </Drawer.Section>

        <Drawer.Section>
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons name="power" color="red" size={size} />
            )}
            label={() => (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Déconnexion
              </Text>
            )}
            onPress={() => {}}
          />
        </Drawer.Section>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});
