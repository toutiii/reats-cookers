import { Image, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import all_constants from "../constants";
import stylesOrder from "../styles/styles-order";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function Order({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            color:
              props.order_status === all_constants.order.status.canceled
                ? "red"
                : "green",
          }}
        >
          {all_constants.order.infos.number} {props.order_number}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: "8%",
        }}
      >
        <View
          style={{
            flex: 1,
            margin: "1%",
            aspectRatio: 1,
          }}
        >
          <Image
            source={{
              uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
            }}
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            flex: 2,
            aspectRatio: 2,
            alignItems: "center",
            paddingLeft: "5%",
          }}
        >
          <View style={stylesOrder.row_element}>
            <View style={stylesOrder.icon_element}>
              <MaterialIcons name="delivery-dining" size={20} color="black" />
            </View>
            <View style={stylesOrder.order_status_text_style}>
              <Text numberOfLines={1} style={stylesOrder.order_text}>
                {props.order_delivery_date}
              </Text>
            </View>
          </View>

          <View style={stylesOrder.row_element}>
            {props.order_status === all_constants.order.status.approved ? (
              <View style={stylesOrder.icon_element}>
                <AntDesign name="checkcircle" size={20} color="black" />
              </View>
            ) : props.order_status === all_constants.order.status.canceled ? (
              <View style={stylesOrder.icon_element}>
                <MaterialIcons name="cancel" size={20} color="black" />
              </View>
            ) : (
              <View style={stylesOrder.icon_element}>
                <FontAwesome name="hourglass-half" size={20} color="black" />
              </View>
            )}

            <View style={stylesOrder.order_status_text_style}>
              <Text numberOfLines={1} style={stylesOrder.order_text}>
                {props.order_status}{" "}
              </Text>
            </View>
          </View>

          <View style={stylesOrder.row_element}>
            <View style={stylesOrder.icon_element}>
              <FontAwesome name="money" size={20} color="black" />
            </View>
            <View style={stylesOrder.order_status_text_style}>
              <Text style={stylesOrder.order_text}>
                {props.order_amount}
                {all_constants.currency_symbol}
              </Text>
            </View>
          </View>
          <View style={stylesOrder.row_element}>
            <View style={stylesOrder.icon_element}>
              <MaterialCommunityIcons
                name="food-turkey"
                color="black"
                size={20}
              />
            </View>
            <View style={stylesOrder.order_status_text_style}>
              <Text style={stylesOrder.order_text}>
                {props.dishes_number} {all_constants.order.infos.dish}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}
