import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Provider, Portal } from "react-native-paper";

import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
import TextInput from "../components/TextInput";

import GlobalStyles from "../constants/GlobalStyles";

const SignInActivity = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (text) => {
    setEmail(text);
  }
  const onChangePassword = (text) => {
    setPassword(text);
  }

  return (
    // <Provider>
    <View
      style={[
        GlobalStyles.genericPage,
        GlobalStyles.yellowBackground,
        styles.container,
      ]}
    >
      <View style={[GlobalStyles.center, styles.topContainer]}>
        {/* <Text>This is the sign in screen</Text> */}
        <AppLogo />
      </View>
      {/* <Portal> */}
      <View style={[GlobalStyles.center, styles.textInputContainer]}>
        <TextInput label="Email" value={email} onChangeText={onChangeEmail} />
        <TextInput label="Password" secureTextEntry={true} value={password} onChangeText={onChangePassword} />
        {/* <TextInput
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
            /> */}
      </View>
      <View style={[GlobalStyles.center, styles.buttonContainer]}>
        <AppButton
          style={[GlobalStyles.whiteBackground, styles.button]}
          // TODO: validate using authentication before sending to Home
          onPress={() => navigation.navigate("Home")}
          text="Sign In"
        />
      </View>
      {/* </Portal> */}
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    flex: 1,
  },
  topContainer: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "white",
  },
  textInputContainer: {
    maxHeight: 120,
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "black",
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default SignInActivity;
