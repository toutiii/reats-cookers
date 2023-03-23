import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import Animated from "react-native-reanimated";

export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  En ligne
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Switch value={isSwitchOn} />
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
