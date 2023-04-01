import React from "react";
import Modal from "react-native-modal";
import { Button, View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

export default function SearchFilterModal(props) {
  const data = [
    { key: "1", value: "ACTIFS" },
    { key: "2", value: "INACTIFS" },
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
          <MultipleSelectList
            setSelected={(val) => props.stateSearchData(val)}
            search={false}
            data={data}
            save="value"
            placeholder="Sélectionnez"
          />
        </View>
      </View>
    </Modal>
  );
}
