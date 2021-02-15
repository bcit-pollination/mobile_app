import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Modal, Button } from "react-native-paper";

import GlobalStyles from "../constants/GlobalStyles";

// TODO: make show and hideModal required props
const AppModal = ({ show, hideModal, text, buttonText }) => {
  return (
    <Modal
      visible={show}
      onDismiss={hideModal}
      contentContainerStyle={GlobalStyles.center}
    >
      <View style={styles.viewContainer}>
        <Text>{text}</Text>
        <Button
          mode="contained"
          onPress={hideModal}
          style={[GlobalStyles.center, styles.button]}
        >
          <Text style={styles.text}>{buttonText ? buttonText : "Close"}</Text>
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "white",
    margin: "auto",
    width: "50%",
    padding: 10,
  },
  button: {
    marginTop: 5,
    backgroundColor: "black",
    // bottom: 0,
  },
  text: {
    color: "white",
  },
});

export default AppModal;
