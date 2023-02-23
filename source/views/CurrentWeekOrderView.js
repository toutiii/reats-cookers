import { Component } from "react";
import { Text, View } from "react-native";
import styles_home_view from "../styles/styles-home-view";
import all_constants from "../constants";
import CustomImageButton from "../button/CustomImageButton";
import CustomAlert from "../components/CustomAlert";
export default class CurrentWeekOrderView extends Component {
  constructor(props) {
    super(props);
    this.paid_orders_count = 15;
    this.cancelled_orders_count = 1;
    this.total_orders_count = 16;
    this.current_balance = 150 + " €";
    this.max_paid_orders = 30;
    this.arrow_uri =
      "https://pics.freeicons.io/uploads/icons/png/6448667931600321999-512.png";
  }
  onPressNavigateToTab = (tab_name, screen_name) => {
    this.props.navigation.navigate(tab_name, { screen: screen_name });
  };
  render() {
    return (
      <>
        <View style={styles_home_view.label_view}>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {all_constants.label.home.current_week_orders}
          </Text>
        </View>
        <View style={styles_home_view.order_view_style}>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "left", fontSize: 18, color: "green" }}>
              {all_constants.label.home.paid}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 20, color: "green" }}>
              {this.paid_orders_count + "/" + this.max_paid_orders}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <CustomImageButton
              onPress={() =>
                this.onPressNavigateToTab("OrdersTab", "PaidOrders")
              }
              uri={this.arrow_uri}
            />
          </View>
        </View>
        <View style={styles_home_view.order_view_style}>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "left", fontSize: 18, color: "red" }}>
              {all_constants.label.home.canceled}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 20, color: "red" }}>
              {this.cancelled_orders_count}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <CustomImageButton
              onPress={() =>
                this.onPressNavigateToTab("OrdersTab", "CancelledOrders")
              }
              uri={this.arrow_uri}
            />
          </View>
        </View>
        <View style={styles_home_view.order_view_style}>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "left", fontSize: 18 }}>
              {all_constants.label.home.total}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              {this.total_orders_count}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </>
    );
  }
}
