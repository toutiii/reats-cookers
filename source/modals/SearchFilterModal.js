import React from "react";
import Modal from "react-native-modal";
import { Button, Platform, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SearchFilterModal(props) {
  const activeFilterData = [
    { key: "1", value: "ACTIFS" },
    { key: "2", value: "INACTIFS" },
  ];
  const orderStateFilterData = [
    { key: "1", value: "ready" },
    { key: "2", value: "cooking" },
    { key: "3", value: "pending" },
    { key: "4", value: "canceled" },
    { key: "5", value: "delivered" },
  ];

  const datePickerMode = "date";
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showAndroidMode = () => {
    // Below is the recommended way to open picker on android in the docs.
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: datePickerMode,
      is24Hour: true,
    });
  };

  const showIOSMode = () => {
    setShow(true);
  };

  const showDatepicker = () => {
    if (Platform.OS === "android") {
      showAndroidMode();
    } else {
      showIOSMode();
    }
  };

  const renderDateTimePicker = () => {
    console.log("manual rendering");
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={datePickerMode}
        is24Hour={true}
        onChange={onChange}
      />
    );
  };

  return (
    <Modal
      isVisible={props.isModalVisible}
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
    >
      <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
        <View style={{ flex: 7 }}>
          {props.enableActiveFilter ? (
            <MultipleSelectList
              setSelected={(val) => props.stateSearchData(val)}
              search={false}
              data={activeFilterData}
              save="value"
              placeholder="Items actifs ou inactifs"
            />
          ) : (
            ""
          )}
          {props.enableOrderStateFilter ? (
            <MultipleSelectList
              setSelected={(val) => props.stateOrderData(val)}
              search={false}
              data={orderStateFilterData}
              save="value"
              placeholder="État de la commande"
            />
          ) : (
            ""
          )}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <TextInput
                editable={false}
                placeholder={"Date de début"}
                mode="outlined"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableRipple
                onPress={showDatepicker}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <MaterialCommunityIcons
                  name="calendar"
                  color={"black"}
                  size={35}
                />
              </TouchableRipple>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 4 }}>
              <TextInput
                editable={false}
                placeholder={"Date de fin"}
                mode="outlined"
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableRipple
                onPress={showDatepicker}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <MaterialCommunityIcons
                  name="calendar"
                  color={"black"}
                  size={35}
                />
              </TouchableRipple>
            </View>
          </View>

          <View style={{ flex: 1 }}>{show && renderDateTimePicker()}</View>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title="OK"
            onPress={() => {
              props.toggleModal();
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
