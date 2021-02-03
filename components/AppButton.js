import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, text, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#FFDD02",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
  }
});

export default AppButton;