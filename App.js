import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// import Landing Page
import LandingActivity from "./screens/LandingActivity";
// import Getting Started Page
import LoginActivity from "./screens/LoginActivity";
import RegisterActivity from "./screens/RegisterActivity";

import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeScreen() {
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
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFDD02",
      }}
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GettingStarted" component={GettingStarted} />
        <Stack.Screen name="Register" component={RegisterActivity} />
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
