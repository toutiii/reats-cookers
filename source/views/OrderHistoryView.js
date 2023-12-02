import React, { Component } from "react";
import { Animated, View, Text } from "react-native";
import styles_order_view from "../styles/styles-order-view";
import all_constants from "../constants";
import CustomButton from "../button/CustomButton";
import DishModal from "../modals/DishModal";
import {
  Fontisto,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

let iconSize = 24;

export default class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      opacity: new Animated.Value(1),
    };
  }

  onPressShowModal = () => {
    this.setState({ modalVisible: true });
  };
  onPressCloseModal = () => {
    this.setState({ modalVisible: false });
  };

  fadeOut = () => {
    Animated.timing(this.state.opacity, {
      toValue: 0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  fadeIn = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <View style={styles_order_view.container}>
        {this.state.modalVisible && (
          <DishModal
            state={this.state.modalVisible}
            onPressCloseModal={this.onPressCloseModal}
            modal_data={this.props.route.params.item.dishes}
          />
        )}
        <Animated.View style={{ opacity: this.state.opacity }}>
          <View style={{ flex: 4, backgroundColor: "white" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Fontisto
                    name="shopping-basket"
                    style={styles_order_view.icons}
                    size={iconSize}
                    color="black"
                  />
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color:
                        this.props.route.params.item.order_status ===
                        all_constants.order.status.canceled
                          ? "red"
                          : "green",
                    }}
                  >
                    {all_constants.order.infos.number}
                    {this.props.route.params.item.order_number}
                  </Text>
                </View>
              </View>

              <View style={styles_order_view.orderview}>
                <View>
                  <AntDesign
                    name="user"
                    style={styles_order_view.icons}
                    size={iconSize}
                    color="black"
                  />
                </View>
                <View style={styles_order_view.icon_text}>
                  <Text style={{ fontSize: 17 }}>
                    {all_constants.order.infos.owner}{" "}
                    {this.props.route.params.item.order_owner} le{" "}
                    {this.props.route.params.item.order_date} à{" "}
                    {this.props.route.params.item.order_hour}{" "}
                  </Text>
                </View>
              </View>
              <View style={styles_order_view.orderview}>
                <View>
                  <FontAwesome
                    name="money"
                    size={iconSize}
                    style={styles_order_view.icons}
                    color="black"
                  />
                </View>
                <View style={styles_order_view.icon_text}>
                  <Text style={{ fontSize: 17 }}>
                    {all_constants.order.infos.amount}{" "}
                    {this.props.route.params.item.order_amount}{" "}
                    {all_constants.currency_symbol}
                  </Text>
                </View>
              </View>

              {this.props.route.params.item.order_status ===
                all_constants.order.status.canceled && (
                <View style={styles_order_view.orderview}>
                  <View>
                    <MaterialIcons
                      name="cancel"
                      style={styles_order_view.icons}
                      size={iconSize}
                      color="black"
                    />
                  </View>
                  <View style={styles_order_view.icon_text}>
                    <Text style={{ fontSize: 17 }}>
                      {all_constants.order.infos.canceled_label}{" "}
                      {this.props.route.params.item.order_cancel_date} à{" "}
                      {this.props.route.params.item.order_cancel_hour}
                    </Text>
                  </View>
                </View>
              )}
              {this.props.route.params.item.order_status ===
                all_constants.order.status.delivered && (
                <View style={styles_order_view.orderview}>
                  <View>
                    <MaterialIcons
                      style={styles_order_view.icons}
                      name="delivery-dining"
                      size={iconSize}
                      color="black"
                    />
                  </View>
                  <View style={styles_order_view.icon_text}>
                    <Text style={{ fontSize: 17 }}>
                      {all_constants.order.infos.delivery_done_label}{" "}
                      {this.props.route.params.item.order_delivery_date} à{" "}
                      {this.props.route.params.item.order_picking_hour}{" "}
                    </Text>
                  </View>
                </View>
              )}
              {this.props.route.params.item.order_status ===
                all_constants.order.status.delivered && (
                <View style={styles_order_view.orderview}>
                  <View>
                    <MaterialCommunityIcons
                      name="google-maps"
                      size={iconSize}
                      color="black"
                      style={styles_order_view.icons}
                    />
                  </View>
                  <View style={styles_order_view.icon_text}>
                    <Text style={{ fontSize: 17 }}>
                      {" "}
                      {all_constants.order.infos.delivery_postal_code} 77127
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles_order_view.button_container}>
            <View style={{ flex: 1 }}>
              <CustomButton
                label={all_constants.modal.dish_modal.show}
                backgroundColor="darkgrey"
                height={50}
                border_width={3}
                border_radius={30}
                font_size={17}
                onPress={this.onPressShowModal}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}
