import React, { useState } from "react";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Order from "../components/Order";
import CustomButton from "../button/CustomButton";
import OrderModal from "../modals/OrderModal";
import { getData } from "../helpers/global_helpers";
import { getOrders } from "../helpers/order_helpers";
import NewOrder from "../components/NewOrder.js";
import { Searchbar } from "react-native-paper";

export default function OrderFlatList({ ...props }) {
  const [modalState, setModalState] = useState(false);
  const onPressShowModal = () => {
    setModalState(true);
  };
  const onPressCloseModal = () => {
    setModalState(false);
  };
  const buildDishDataForOrderModal = () => {
    // We do this only for paid orders
    if (props.route.params.tag === all_constants.tag.orders.paid) {
      const orders_data = getData(
        getOrderList(),
        props.route.params.tag,
        undefined,
        "order_tag",
        "id"
      );
      const indexes = Object.keys(orders_data);
      let orderModalData = {};
      let orderTotalAmount = 0;
      let totalNumberOfDishes = 0;
      for (let i = 0; i < indexes.length; i++) {
        const orderItemObject = orders_data[i];
        const dishIndexes = Object.keys(orderItemObject["dishes"]);
        for (let j = 0; j < dishIndexes.length; j++) {
          const dishItemObject = orderItemObject["dishes"][j];
          totalNumberOfDishes += parseInt(dishItemObject["dish_quantity"]);
          orderTotalAmount +=
            parseInt(dishItemObject["dish_quantity"]) *
            parseInt(dishItemObject["dish_unit_price"]);
          for (let dishKey in dishItemObject) {
            if (dishKey === "dish_name") {
              const dishName = dishItemObject[dishKey];
              if (Object.keys(orderModalData).includes(dishName)) {
                orderModalData[dishName][0] += parseInt(
                  dishItemObject["dish_quantity"]
                );
              } else {
                orderModalData[dishName] = [
                  parseInt(dishItemObject["dish_quantity"]),
                  parseInt(dishItemObject["dish_unit_price"]),
                ];
              }
            }
          }
        }
      }
      orderModalData["Total"] = [totalNumberOfDishes, orderTotalAmount];
      return orderModalData;
    }
  };
  const buildDeliveryDataForOrderModal = () => {
    if (props.route.params.tag === all_constants.tag.orders.paid) {
      const orders_data = getData(
        getOrderList(),
        props.route.params.tag,
        undefined,
        "order_tag",
        "id"
      );
      const indexes = Object.keys(orders_data);
      let orderDeliveryData = {};
      for (let i = 0; i < indexes.length; i++) {
        const orderItemObject = orders_data[i];
        let deliveryDate =
          orderItemObject["order_delivery_date"] +
          " à " +
          orderItemObject["order_picking_hour"];
        if (!Object.keys(orderDeliveryData).includes(deliveryDate)) {
          orderDeliveryData[deliveryDate] = [];
        }
        const dishIndexes = Object.keys(orderItemObject["dishes"]);
        let tempArray = [];
        for (let j = 0; j < dishIndexes.length; j++) {
          const dishItemObject = orderItemObject["dishes"][j];
          let dishQuantity = dishItemObject["dish_quantity"];
          let dishName = dishItemObject["dish_name"];
          tempArray.push([dishQuantity, dishName]);
        }
        orderDeliveryData[deliveryDate] = tempArray;
      }
      return orderDeliveryData;
    }
  };

  const getOrderList = () => {
    if (props.route.params.tag === all_constants.tag.orders.archived) {
      return props.route.params.item;
    }
    return getOrders();
  };
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View
      style={{
        flex: 1,
        marginTop:
          props.route.params.tag === all_constants.tag.orders.archived
            ? "10%"
            : "0%",
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {props.route.params.tag === all_constants.tag.orders.paid ? (
        <OrderModal
          state={modalState}
          onPressCloseModal={onPressCloseModal}
          data={buildDishDataForOrderModal()}
          deliveryData={buildDeliveryDataForOrderModal()}
          numberOfOrders={
            Object.keys(
              getData(
                getOrderList(),
                props.route.params.tag,
                undefined,
                "order_tag",
                "id"
              )
            ).length
          }
        />
      ) : (
        <View></View>
      )}
      <View
        style={{
          backgroundColor: "white",
          flex:
            props.route.params.tag === all_constants.tag.orders.paid ? 10 : 1,
        }}
      >
        <FlatList
          data={getData(
            getOrderList(),
            props.route.params.tag,
            undefined,
            "order_tag",
            "id"
          )}
          ListFooterComponent={<View></View>}
          ListFooterComponentStyle={{
            borderWidth: 5,
            borderColor: "red",
            borderRadius: 50,
          }}
          ListEmptyComponent={
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 20 }}>
                {all_constants.order.no_order_found}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles_order.order_button_container}>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("OrderView", { item: item });
                }}
                style={{ flex: 1 }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <NewOrder
                  order_number_color={item.order_number_color}
                  order_number={item.order_number}
                  order_status={item.order_status}
                  order_delivery_date={item.order_delivery_date}
                  order_delivery_hour={item.order_delivery_hour}
                ></NewOrder>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </View>
  );
}
