import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Linking,
  Pressable,
} from "react-native";
import { color } from "react-native-reanimated";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLogo from "../components/AppLogo";
import BlackButton from "../components/BlackButton";

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
        <BlackButton
          title="Get Started"
          onPress={() => navigation.navigate("GettingStarted")}
        />
      </View>

      <View style={styles.register}>
        <BlackButton title="Manage Elections" onPress={manageElections} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  register: {
    marginTop: 25,
  },
});
