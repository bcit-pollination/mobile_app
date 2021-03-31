import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";

// TODO: make show and onPress mandatory props
const DetailsModalOld = ({ info, show, setShow }) => {
  // onPress function for Pressable button
  const closeModal = () => {
    setShow(!show);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={[GlobalStyles.center, styles.modalView]}>
        <View style={[GlobalStyles.whiteBackground, styles.modalBox]}>
          <View style={GlobalStyles.center}>
            <Text>{info}</Text>
          </View>
          <Pressable
            onPress={closeModal}
            style={[GlobalStyles.center, styles.button]}
          >
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: "100%",
    width: "100%",
  },
  modalBox: {
    padding: 15,
    minWidth: "40%",
    minHeight: "20%",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "black",
    bottom: 0,
  },
  text: {
    color: "white",
  },
});

export default DetailsModalOld;
