import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Provider, Portal, TextInput as PaperInput } from "react-native-paper";

const TextInput = ({label, value, onChangeText, secureTextEntry }) => {
  return (
    // <Provider>
    <View style={styles.container}>
      <PaperInput
        label={label}
        mode="outlined"
        value={value}
        style={styles.textInput}
        secureTextEntry={ secureTextEntry ? true : false}
        onChangeText={onChangeText}
      />
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "blue",
    width: '50%',
    maxHeight: 60,
  },
  textInput: {
    // maxHeight: 60,
    minWidth: '100%',
    // padding: 0,
    // margin: 0,
  },
});

export default TextInput;
