import React, { useRef } from "react";
import {
  Animated,
  Button,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Divider, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import all_constants from "../constants";

export default function Dashboard(props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    console.log("fading out");
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };
  const pieData = [
    {
      value: 1,
      color: "red",
      gradientCenterColor: "white",
      legend: "canceled",
    },
    {
      value: 5,
      color: "orange",
      gradientCenterColor: "white",
      legend: "to confirm",
    },
    {
      value: 3,
      color: "tomato",
      gradientCenterColor: "white",
      legend: "in progress",
    },
    {
      value: 2,
      color: "green",
      gradientCenterColor: "white",
      legend: "ready for picking",
    },
  ];

  const barData = [
    {
      value: 25,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
      label: "Jan",
    },

    { value: 20, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

    {
      value: 35,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
      label: "Feb",
    },

    { value: 30, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

    {
      value: 45,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
      label: "Mar",
    },

    { value: 40, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

    {
      value: 52,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
    },

    { value: 49, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },

    {
      value: 30,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
    },

    { value: 28, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      console.log("TODO !");
      setRefreshing(false);
    }, 500);
  }, [refreshing]);

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("red")}

            <Text style={{ color: "white" }}>
              {pieData[0].value} {pieData[0].legend}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("orange")}

            <Text style={{ color: "white" }}>
              {pieData[1].value} {pieData[1].legend}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("tomato")}

            <Text style={{ color: "white" }}>
              {pieData[2].value} {pieData[2].legend}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("green")}

            <Text style={{ color: "white" }}>
              {pieData[3].value} {pieData[3].legend}
            </Text>
          </View>
        </View>
      </>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
          opacity: fadeAnim,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isModalVisible ? (
          <Modal
            testID={"modal"}
            isVisible={isModalVisible}
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
          >
            <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
              <View style={{ flex: 1 }}>
                <Button title="Close" onPress={toggleModal} />
              </View>

              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, textAlign: "center" }}>
                  {all_constants.dashboard.scroll_update}
                </Text>
              </View>
            </View>
          </Modal>
        ) : (
          ""
        )}
        <TouchableRipple onPress={toggleModal} rippleColor="yellow">
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="information-outline"
              color={"#232B5D"}
              size={35}
            />
          </View>
        </TouchableRipple>
        <View
          style={{
            margin: 20,
            borderRadius: 20,
            backgroundColor: "#232B5D",
            flex: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {all_constants.dashboard.titles.orders}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              focusOnPress={true}
              radius={90}
              innerRadius={60}
              innerCircleColor={"white"}
            />
          </View>

          {renderLegendComponent()}
        </View>
        <Divider />
        <View
          style={{
            margin: 20,
            borderRadius: 20,
            backgroundColor: "#232B5D",
            flex: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {all_constants.dashboard.titles.turnover}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <BarChart
              data={barData}
              barWidth={16}
              initialSpacing={10}
              barBorderRadius={4}
              yAxisThickness={0}
              xAxisThickness={3}
              xAxisType={"dashed"}
              xAxisColor={"lightgray"}
              yAxisTextStyle={{ color: "lightgray" }}
              stepValue={10}
              minValue={10}
              noOfSections={5}
              maxValue={10 * 10}
              yAxisLabelSuffix={"€"}
              spacing={14}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },

  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
  },
});
