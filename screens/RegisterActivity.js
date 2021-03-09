import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
import TextInput from "../components/TextInput";

import GlobalStyles from "../constants/GlobalStyles";

const RegisterActivity = ({ navigation }) => {
  const STORAGE_KEY = 'jwt_token';
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

  const onValueChange = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
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
      console.log(response.status);
      return response.json();
    }).then((responseData) => {
      // responseData contains jwt_token
      onValueChange(STORAGE_KEY, responseData.jwt_token);
    }).then((resolve) => {
      console.log("resolve" + resolve);
      redirectToHome();
    }).catch((error) => {
      console.log("Error")
      console.error(error);
    });
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
