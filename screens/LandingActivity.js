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

import LoginActivity from "./LoginActivity";
import AppLogo from "../components/AppLogo";
import AppButton from "../components/AppButton";

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
    <View style={styles.container}>
      <AppLogo />

      <View style={styles.landingBtns}>
        <AppButton
          style={[GlobalStyles.whiteBackground, styles.register]}
          onPress={() => navigation.navigate("GettingStarted")}
          text="Get Started"
        />
      </View>

      <View style={styles.landingBtns}>
        <AppButton
          style={[GlobalStyles.whiteBackground]}
          onPress={() => navigation.navigate("GettingStarted")}
          text="Manage Elections"
        />
      </View>

      <View style={styles.landingBtns}>
        <AppButton
          style={[GlobalStyles.whiteBackground]}
          onPress={() => navigation.navigate("MultiChoiceVote")}
          text="[MultiChoice testing]"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  landingBtns: {
    marginTop: 25,
    minWidth: 170,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});