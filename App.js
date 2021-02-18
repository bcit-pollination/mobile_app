import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// import Landing Page
import LandingActivity from "./screens/LandingActivity";
import GlobalStyles from "./constants/GlobalStyles";
// import Getting Started Page
import LoginActivity from "./screens/LoginActivity";
import SignInActivity from "./screens/SignInActivity";
import RegisterActivity from "./screens/RegisterActivity";
import HomeActivity from "./screens/HomeActivity";
import SingleChoiceVoteActivity from "./screens/SingleChoiceVoteActivity";
import MultiChoiceVoteActivity from "./screens/MultiChoiceVoteActivity";
import VoteSuccessActivity from "./screens/VoteSuccessActivity";
import YesNoActivity from './screens/YesNoVoteActivity'

import BleConnectionActivity from './screens/BleConnectionActivity'

import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// TODO: move View styles to StyleSheet or use GlobalStyles instead

function LandingScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFDD02",
      }}
    >
      <LandingActivity navigation={navigation} />
      {/* <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      /> */}
    </View>
  );
}

function GettingStarted() {
  const navigation = useNavigation();
  return (
    <View
      style={[{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }, GlobalStyles.yellowBackground
      ]}
    >
      <LoginActivity navigation={navigation} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer
      style={{
        backgroundColor: "yellow",
      }}
    >
      {/* Set page names here for navigation to access */}
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="GettingStarted" component={GettingStarted} />
        <Stack.Screen name="SignIn" component={SignInActivity} />
        <Stack.Screen name="Register" component={RegisterActivity} />
        <Stack.Screen name="Home" component={HomeActivity} />
        <Stack.Screen name="SingleChoiceVote" component={SingleChoiceVoteActivity} />
        <Stack.Screen name="MultiChoiceVote" component={MultiChoiceVoteActivity} />
        <Stack.Screen name="VoteSuccess" component={VoteSuccessActivity} />
        <Stack.Screen name="BleConnection" component={BleConnectionActivity} />
        <Stack.Screen name='YesNoVote' component={YesNoActivity} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFDD02",
    alignItems: "center",
    justifyContent: "center",
  },
});
