import React from "react";
import Modal from "react-native-modal";
import { Button, View } from "react-native";

export default function SearchFilterModal(props) {
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
      </View>
    </Modal>
  );
}
