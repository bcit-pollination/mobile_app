import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
import TextInput from "../components/TextInput";

import GlobalStyles from "../constants/GlobalStyles";

const RegisterActivity = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeFirstName = (text) => {
    setFirstName(text);
  }
  const onChangeLastName = (text) => {
    setLastName(text);
  }
  const onChangeDOB = (text) => {
    setDOB(text);
  }
  const onChangeEmail = (text) => {
    setEmail(text);
  }
  const onChangePassword = (text) => {
    setPassword(text);
  }

  const redirectToHome = () => {
    navigation.navigate("Home");
  }

  const handleSubmit = () => {
    fetch('http://pollination.live/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dob: DOB,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
      })
    }).then((response) => {
      console.log("Response received")
      console.log(JSON.stringify(response));
    }).catch((error) => {
      console.log("Error")
      console.error(error);
    });
    redirectToHome();
  }

  return (
    <View
      style={[
        GlobalStyles.genericPage,
        GlobalStyles.yellowBackground,
        styles.container,
      ]}
    >
      <View style={[GlobalStyles.center, styles.topContainer]}>
        <AppLogo />
      </View>
      <View style={[GlobalStyles.center, styles.textInputContainer]}>
        <TextInput 
          label="First Name" 
          value={firstName} 
          onChangeText={onChangeFirstName} 
        />
        <TextInput 
          label="Last Name" 
          value={lastName} 
          onChangeText={onChangeLastName} 
        />
        <TextInput 
          label="DOB (2021-03-03)" 
          value={DOB} 
          onChangeText={onChangeDOB} 
        />
        <TextInput 
          label="Email" 
          value={email} 
          onChangeText={onChangeEmail} 
        />
        <TextInput 
          label="Password" 
          secureTextEntry={true} 
          value={password} 
          onChangeText={onChangePassword} 
        />
      </View>
      <View style={[GlobalStyles.center, styles.buttonContainer]}>
        <AppButton
          style={[GlobalStyles.whiteBackground, styles.button]}
          onPress={handleSubmit}
          text="Register"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: "100%",
    flex: 1,
  },
  topContainer: {
    flex: 0.5,
  },
  textInputContainer: {
    maxHeight: 120,
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "black",
  },
  bottomContainer: {
    flex: 1,
  },
  button: {
    marginTop: 150,
    // borderWidth: 1,
    // borderColor: "red",
  },
});

export default RegisterActivity;
