import React from "react";
import { StyleSheet, View, Text, Button, Image, Linking } from "react-native";
import { color } from "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginActivity from "./LoginActivity";

import AppLogo from '../components/AppLogo';

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

      <View>
        <Button
          style={styles.signIn}
          title="Get Started"
          color="black"
          onPress={() => navigation.navigate("GettingStarted")}
        />
      </View>

      <View style={styles.register}>
        <Button
          onPress={manageElections}
          title="Manage Elections"
          color="black"
        />
      </View>
      {/* <Button onPress={() => { console.log('onpress') }} title='Manage Elections' color='white' /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: {
    // marginTop: 60
  },
  register: {
    marginTop: 25,
  },
});
