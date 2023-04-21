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
            color: props.order_number_color,
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
            margin: "1%",
            aspectRatio: 2,
            alignItems: "center",
          }}
        >
          <View style={{ padding: 10, alignItems: "flex-start" }}>
            <View style={stylesOrder.row_element}>
              <View>
                <MaterialIcons name="delivery-dining" size={20} color="black" />
              </View>
              <Text style={stylesOrder.order_text}>
                {props.order_delivery_date} à {props.order_delivery_hour}{" "}
              </Text>
            </View>

            <View style={stylesOrder.row_element}>
              {props.order_status === all_constants.order.status.approved ? (
                <View>
                  <AntDesign name="checkcircle" size={20} color="black" />
                </View>
              ) : props.order_status === all_constants.order.status.canceled ? (
                <MaterialIcons name="cancel" size={20} color="black" />
              ) : (
                <View>
                  <FontAwesome name="hourglass-half" size={20} color="black" />
                </View>
              )}

              <Text style={stylesOrder.order_text}>{props.order_status} </Text>
            </View>

            <View style={stylesOrder.row_element}>
              <View>
                <FontAwesome name="money" size={20} color="black" />
              </View>
              <Text style={stylesOrder.order_text}>
                {props.order_amount}
                {all_constants.currency_symbol}
              </Text>
            </View>
            <View style={stylesOrder.row_element}>
              <View>
                <MaterialCommunityIcons
                  name="food-turkey"
                  color="black"
                  size={20}
                />
              </View>
              <Text style={stylesOrder.order_text}>
                {props.dishes_number} plats
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}
