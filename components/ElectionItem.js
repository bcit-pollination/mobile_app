import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import GlobalStyles from "../constants/GlobalStyles";

// const showModal = () => {
//   return 
// }

// TODO: make onLongPress mandatory props
const ElectionItem = ({ title, endDate, onLongPress, onPress }) => {
  return (
    <TouchableOpacity 
      style={[GlobalStyles.yellowBackground, styles.electionContainer]} 
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  electionContainer: {
    marginVertical: 10,
    padding: 10,
  },
  text: {
    fontSize: 24,
  },
});

export default ElectionItem;
