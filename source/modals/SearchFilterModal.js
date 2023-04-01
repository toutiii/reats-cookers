import React from "react";
import Modal from "react-native-modal";
import { Button, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

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
        <View style={{ flex: 1 }}>
          <Button
            title="Close"
            onPress={() => {
              props.toggleModal();
            }}
          />
        </View>
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
        </View>
      </View>
    </Modal>
  );
}
