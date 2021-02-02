import React from "react";
import { StyleSheet, View, Text, Button, Image, Linking, Pressable } from "react-native";
import { color } from "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginActivity from "./LoginActivity";

import AppLogo from "../components/AppLogo";

import GlobalStyles from "../constants/GlobalStyles";

export default function LandingActivity({ navigation }) {
  // Leads to the management website.
  function manageElections() {
    console.log("manageElections()");
    Linking.openURL("https://google.com").catch((err) =>
      console.error("An error occurred", err)
    );
  }

  return (
    <View style={{ flexDirection: "column" }}>
      <View classname="logo_large">
        <AppLogo />
      </View>

      <View style={styles.register}>
        <Pressable
          style={[GlobalStyles.center, styles.signIn]}
          onPress={() => navigation.navigate("GettingStarted")}
        >
          <Text style={styles.text}>Get Started</Text>
        </Pressable>
        {/* <Button
          style={styles.signIn}
          title="Get Started"
          color="black"
          onPress={() => navigation.navigate("GettingStarted")}
        /> */}
      </View>

      <View style={styles.register}>
        <Pressable
          style={[GlobalStyles.center, styles.signIn]}
          onPress={manageElections}
        >
          <Text style={styles.text}>Manage Elections</Text>
        </Pressable>
        {/* <Button
          onPress={manageElections}
          title="Manage Elections"
          color="black"
        /> */}
      </View>
      {/* <Button onPress={() => { console.log('onpress') }} title='Manage Elections' color='white' /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: {
    backgroundColor: "black",
    padding: 10,
  },
  register: {
    marginTop: 25,
  },
  text: {
    color: "white",
  },
});
