import React, { Component } from "react";
import { ActivityIndicator, Animated, View, Text, Button } from "react-native";
import styles_order_view from "../styles/styles-order-view";
import HorizontalLine from "../components/HorizontalLine";
import all_constants from "../constants";
import Order from "../components/Order";
import CustomButton from "../button/CustomButton";
import DishModal from "../modals/DishModal";
import CustomAlert from "../components/CustomAlert";
import styles_form from "../styles/styles-form";
import { callBackEnd } from "../api/fetch";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Modal from "react-native-modal";
export default class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      showAlert: false,
      acceptOrder: false,
      declineOrder: false,
      isSubmitting: false,
      opacity: new Animated.Value(1),
      result: {},
    };
  }

  onPressShowModal = () => {
    this.setState({ modalVisible: true });
  };
  onPressCloseModal = () => {
    this.setState({ modalVisible: false });
  };
  updateOrderStatus = async (newStatus) => {
    let oldStatus = this.props.route.params.item["order_status"];
    this.setState({ isSubmitting: true });
    this.fadeOut();
    this.props.route.params.item["order_status"] = newStatus;
    this.state.result = await callBackEnd(
      this.props.route.params.item,
      all_constants.uri.api.mock,
      "POST"
    );
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (!this.state.result.ok) {
      this.props.route.params.item["order_status"] = oldStatus;
    }
    this.setState({ isSubmitting: false });
    this.setState({ showAlert: true });
    this.fadeIn();
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
        {this.state.isSubmitting && (
          <View style={styles_form.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
        )}
        {!this.state.isSubmitting &&
          this.state.result.ok &&
          this.state.acceptOrder && (
            <CustomAlert
              show={this.state.showAlert}
              title={all_constants.messages.orders.accept.title}
              message={all_constants.messages.orders.accept.message}
              confirmButtonColor="green"
              onConfirmPressed={() => {
                this.setState({ showAlert: false });
                this.setState({ acceptOrder: false });
                this.setState({ result: {} });
              }}
            />
          )}
        {!this.state.isSubmitting &&
          this.state.result.ok &&
          this.state.declineOrder && (
            <CustomAlert
              show={this.state.showAlert}
              title={all_constants.messages.orders.cancel.title}
              message={all_constants.messages.orders.cancel.message}
              confirmButtonColor="red"
              onConfirmPressed={() => {
                this.setState({ showAlert: false });
                this.setState({ declineOrder: false });
              }}
            />
          )}
        {!this.state.isSubmitting &&
          !this.state.result.ok &&
          Object.keys(this.state.result).length !== 0 && (
            <CustomAlert
              show={this.state.showAlert}
              title={all_constants.messages.orders.error.title}
              message={all_constants.messages.orders.error.message}
              confirmButtonColor="red"
              onConfirmPressed={() => {
                this.setState({ showAlert: false });
                this.setState({ declineOrder: false });
                this.setState({ acceptOrder: false });
                this.setState({ result: {} });
              }}
            />
          )}
        {this.state.showAlert &&
          this.state.acceptOrder &&
          Object.keys(this.state.result).length === 0 && (
            <CustomAlert
              show={this.state.showAlert}
              title={all_constants.custom_alert.orderview.accept_order_title}
              message={
                all_constants.custom_alert.orderview.accept_order_message
              }
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={() => {
                this.setState({ showAlert: false });
                this.updateOrderStatus(all_constants.order.status.approved);
              }}
              onCancelPressed={() => {
                this.setState({ showAlert: false });
                this.setState({ acceptOrder: false });
              }}
            />
          )}
        {this.state.showAlert &&
          this.state.declineOrder &&
          Object.keys(this.state.result).length === 0 && (
            <CustomAlert
              show={this.state.showAlert}
              title={all_constants.custom_alert.orderview.decline_order_title}
              message={
                all_constants.custom_alert.orderview.decline_order_message
              }
              confirmButtonColor="green"
              showCancelButton={true}
              cancelButtonColor="red"
              cancelText={all_constants.custom_alert.homeview.cancel_text}
              onConfirmPressed={() => {
                this.setState({ showAlert: false });
                this.updateOrderStatus(all_constants.order.status.canceled);
              }}
              onCancelPressed={() => {
                this.setState({ showAlert: false });
                this.setState({ declineOrder: false });
              }}
            />
          )}
        {this.state.modalVisible ? (
          <DishModal
            state={this.state.modalVisible}
            onPressCloseModal={this.onPressCloseModal}
            modal_data={this.props.route.params.item.dishes}
          />
        ) : (
          ""
        )}
        <Animated.View style={{ opacity: this.state.opacity }}>
          <View style={{ flex: 2, backgroundColor: "white" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontSize: 17 }}>
                  n°
                  {this.props.route.params.item.order_number}
                </Text>
              </View>

              <View style={styles_order_view.orderview}>
                <View>
                  <AntDesign
                    name="user"
                    style={{ marginRight: "1%" }}
                    size={30}
                    color="black"
                  />
                </View>
                <View>
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
                    size={30}
                    style={{ marginRight: "1%" }}
                    color="black"
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 17 }}>
                    {all_constants.order.infos.amount}{" "}
                    {this.props.route.params.item.order_amount}{" "}
                    {all_constants.currency_symbol}
                  </Text>
                </View>
              </View>
              <View style={styles_order_view.orderview}>
                {this.props.route.params.item.order_status ===
                all_constants.order.status.approved ? (
                  <>
                    <View>
                      <AntDesign
                        name="checkcircle"
                        style={{ marginRight: "1%" }}
                        size={30}
                        color="black"
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17 }}>
                        {" "}
                        {all_constants.order.infos.approved_label}{" "}
                        {this.props.route.params.item.order_accept_date} à{" "}
                        {this.props.route.params.item.order_accept_hour}{" "}
                      </Text>
                    </View>
                  </>
                ) : this.props.route.params.item.order_status ===
                  all_constants.order.status.canceled ? (
                  <>
                    <View>
                      <MaterialIcons
                        name="cancel"
                        style={{ marginRight: "1%" }}
                        size={30}
                        color="black"
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17 }}>
                        {all_constants.order.infos.canceled_label}{" "}
                        {this.props.route.params.item.order_cancel_date} à{" "}
                        {this.props.route.params.item.order_cancel_hour}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View>
                      <FontAwesome
                        name="hourglass-half"
                        size={24}
                        color="black"
                        style={{ marginRight: "1%" }}
                      />
                    </View>
                    <View>
                      <Text style={{ fontSize: 17 }}>
                        {this.props.route.params.item.order_status}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <View style={styles_order_view.orderview}>
                <View>
                  <MaterialIcons
                    style={{ marginRight: "1%" }}
                    name="delivery-dining"
                    size={30}
                    color="black"
                  />
                </View>
                <View>
                  {this.props.route.params.item.order_status ===
                  all_constants.order.status.approved ? (
                    <Text style={{ fontSize: 17 }}>
                      {all_constants.order.infos.delivered_label}{" "}
                      {this.props.route.params.item.order_delivery_date} à{" "}
                      {this.props.route.params.item.order_picking_hour}{" "}
                    </Text>
                  ) : this.props.route.params.item.order_status ===
                    all_constants.order.status.canceled ? (
                    <Text style={{ fontSize: 17 }}>
                      Livraison {this.props.route.params.item.order_status}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 17 }}>
                      Livraison en attente de confirmation
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles_order_view.orderview}>
                <View>
                  <MaterialCommunityIcons
                    name="google-maps"
                    size={30}
                    color="black"
                    style={{ marginRight: "1%" }}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 17 }}>
                    4 rue de la grande ferme lieusaint 77127
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles_order_view.button_container}>
            {this.props.route.params.item.order_status ===
            all_constants.order.status.pending ? (
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={all_constants.label.order.accept}
                  backgroundColor="green"
                  label_color="white"
                  height={50}
                  border_width={3}
                  border_radius={30}
                  font_size={17}
                  onPress={() => {
                    this.setState({ showAlert: true });
                    this.setState({ acceptOrder: true });
                  }}
                />
              </View>
            ) : (
              <View></View>
            )}
            {this.props.route.params.item.order_status ===
            all_constants.order.status.approved ? (
              <View style={{ flex: 1 }}>
                <CustomButton
                  label={all_constants.label.order.reject}
                  backgroundColor="red"
                  label_color="white"
                  height={50}
                  border_width={3}
                  border_radius={30}
                  font_size={17}
                  onPress={() => {
                    this.setState({ showAlert: true });
                    this.setState({ declineOrder: true });
                  }}
                />
              </View>
            ) : (
              <View></View>
            )}
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
            <View style={{ flex: 1 }}>
              <CustomButton
                label={all_constants.messages.cancel}
                height={50}
                border_width={3}
                border_radius={30}
                font_size={18}
                backgroundColor={"tomato"}
                label_color="white"
                onPress={() => {
                  this.props.navigation.goBack(null);
                }}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}
