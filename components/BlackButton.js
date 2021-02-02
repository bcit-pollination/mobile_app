import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import GlobalStyles from "../constants/GlobalStyles";

const BlackButton = ({ title, onPress }) => {
  return (
    <Pressable style={[GlobalStyles.center, styles.signIn]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    signIn: {
      backgroundColor: "black",
      padding: 10,
    },
    text: {
      color: "white",
    },
  });
  

export default BlackButton;
