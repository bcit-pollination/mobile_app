import React from "react";
import { StyleSheet, View, Text } from "react-native";

import AppButton from "../components/AppButton";

import GlobalStyles from "../constants/GlobalStyles";

const SignInActivity = ({navigation}) => {
  return (
    <View style={[GlobalStyles.genericPage, GlobalStyles.yellowBackground]}>
      <Text>This is sign in screen</Text>
      <AppButton
        style={[GlobalStyles.whiteBackground]}
        onPress={() => navigation.navigate("Home")}
        text="Sign In"
      />
    </View>
  );
};

export default SignInActivity;
