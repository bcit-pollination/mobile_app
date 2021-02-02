import React from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLogo from "../components/AppLogo";
import BlackButton from "../components/BlackButton";

export default function LoginActivity({ navigation }) {
  return (
    <View style={{ flexDirection: "column" }}>
      <View classname="logo_large">
        <AppLogo />
      </View>

      <View style={styles.register}>
        <BlackButton
          title="Sign In"
          onPress={() => navigation.navigate("Home")}
        />
      </View>

      <View style={styles.register}>
        <BlackButton
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    marginTop: 25,
  },
});
