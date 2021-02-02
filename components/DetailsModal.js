import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";

const DetailsModal = ({ info }) => {
  // modal is not shown at first
  const [show, setShow] = useState(false);

  const changeState = () => {
    setShow(!show);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={show}>
      <View style={GlobalStyles.center}>
        <Text>{info}</Text>
      </View>
      <Pressable onPress={changeState}>
        <Text>Close</Text>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  
})

export default DetailsModal;
