import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

import GlobalStyles from "../constants/GlobalStyles";

Pressable.defaultProps = { activeOpacity: 0.5 };

const AppButton = ({ onPress, text, style }) => (
  <Pressable onPress={onPress} style={[GlobalStyles.center, styles.buttonContainer, style]}>
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
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