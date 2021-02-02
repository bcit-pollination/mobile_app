import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";


// TODO: make show and onPress mandatory props
const DetailsModal = ({ info, show, setShow, changeVisibility }) => {
  const closeModal = () => {
    setShow(!show);
  }

  return (
    <Modal animationType="fade" transparent={false} visible={show}>
      <View style={GlobalStyles.center}>
        <Text>{info}</Text>
      </View>
      <Pressable onPress={closeModal} style={[GlobalStyles.center, styles.button]}>
        <Text style={styles.text}>Close</Text>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
  },
  text: {
    color: "white",
  }
})

export default DetailsModal;
