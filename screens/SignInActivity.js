import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";

import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";

import GlobalStyles from "../constants/GlobalStyles";

const SignInActivity = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={[GlobalStyles.genericPage, GlobalStyles.yellowBackground]}>
      <AppLogo />
      <View >
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <AppButton
        style={[GlobalStyles.whiteBackground, styles.button]}
        onPress={() => navigation.navigate("Home")}
        text="Sign In"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  }
});

export default SignInActivity;
