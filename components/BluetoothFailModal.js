import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Modal, Button } from "react-native-paper";

import GlobalStyles from "../constants/GlobalStyles";

// TODO: make show and hideModal required props
const BluetoothFailModal = ({ show, hideModal }) => {
  return (
    <Modal
      visible={show}
      onDismiss={hideModal}
      contentContainerStyle={[GlobalStyles.center, styles.modalStyle]}
    >
      <Text>Failed to connect with Bluetooth. <br/>Please try again.</Text>
      <Button
        mode="contained"
        onPress={hideModal}
        style={[GlobalStyles.center, styles.button]}
      >
        <Text style={styles.text}>Close</Text>
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "white",
    margin: "auto", // centers modal
    width: "50%",
    padding: 10,
  },
  button: {
    backgroundColor: "black",
    // bottom: 0,
  },
  text: {
    color: "white",
  },
});

export default BluetoothFailModal;
