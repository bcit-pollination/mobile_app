import React, { useState, useEffect } from "react";
import { StyleSheet, Pressable, Text } from "react-native";

import GlobalStyles from "../constants/GlobalStyles";

Pressable.defaultProps = { activeOpacity: 0.5 };

const AppButton = ({ onPress, text, style, minAchieved }) => {
  const [minError, setMinError] = useState(initialMinError());
  useEffect(() => {
    setMinError(initialMinError());
  }, [minAchieved])
  function initialMinError() {
    if (minAchieved === undefined || minAchieved) {
      return false;
    }
    return true;
  }

  return (
    <Pressable onPress={() => {
      if (minAchieved === undefined || minAchieved) {
        onPress();
      } else {
        console.log("Min not achieved.");
      }
      }} 
      style={minError ? [GlobalStyles.center, styles.buttonDisabled, style] : [GlobalStyles.center, styles.buttonContainer, style]}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
};

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
  },
  buttonDisabled: {
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 12
  }
});

export default AppButton;