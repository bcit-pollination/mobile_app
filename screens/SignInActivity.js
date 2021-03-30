import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppButton from "../components/AppButton";
import AppLogo from "../components/AppLogo";
import TextInput from "../components/TextInput";

import GlobalStyles from "../constants/GlobalStyles";

const SignInActivity = ({ navigation }) => {
  const STORAGE_KEY = "jwt_token";
  const [email, setEmail] = useState("test@pollination.test");
  const [password, setPassword] = useState("adminadmin");

  const VOTING_STORAGE = "voting_token";
  const ELECTIONS_KEY = "elections_arr";
  let org_ids = [];
  let elections = [];

  const onChangeEmail = (text) => {
    setEmail(text);
  };
  const onChangePassword = (text) => {
    setPassword(text);
  };

  const redirectToHome = () => {
    navigation.navigate("Home");
  };

  const onValueChange = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
  };

  const getUserToken = async () => {
    let USER_TOKEN = await AsyncStorage.getItem("jwt_token");
    return USER_TOKEN;
  };

  // Gets user's voting token
  const getVotingToken = (user_token) => {
    fetch("https://pollination.live/api/user/voting_token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) return response.json();
        else throw new Error("status != 200 in getting voting token");
      })
      .then((responseData) => {
        // responseData contains voting_token
        console.log("checking type: " + typeof responseData.voting_token);
        onValueChange(VOTING_STORAGE, responseData.voting_token);
      })
      .catch((error) => {
        console.log("Error");
        console.error(error);
      });
  };

  // Gets user's voting_token from AsyncStorage
  const getVotingTokenFromStorage = async () => {
    let VOTING_TOKEN = await AsyncStorage.getItem("voting_token");
    console.log("%%%%%%%%%%%%%VOTING_TOKEN%%%%%%%%%%%%%%");
    console.log(VOTING_TOKEN.toString());
    return VOTING_TOKEN.toString();
  };

  // fill in array of org_ids
  const getOrgIds = (org_list) => {
    org_ids = org_list.map((org) => {
      return org.org_id;
    });
  };

  // get all elections in elections array
  const getElections = (orgs, token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("orgs[i]: " + parseInt(orgs));
        fetch(
          `https://pollination.live/api/org/elections/list?org_id=${orgs}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            console.log(response.status);
            if (response.status === 200) return response.json();
            else throw new Error("status != 200");
          })
          .then((responseData) => {
            // responseData contains elections
            console.log(responseData.elections);
            for (let j = 0; j < responseData.elections.length; j++) {
              // cheesed
              const len = elections.length;
              elections[len] = responseData.elections[j];
              console.log("cur elections");
              console.log(elections[len]);
            }
          })
          .then((res) => {
            resolve(orgs, token);
          });
      }, 500);
    });
  };

  const getOrg = (user_token) => {
    fetch("https://pollination.live/api/org/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    })
      .then((response) => {
        console.log("response status: " + response.status);
        if (response.status === 200) return response.json();
        else throw new Error("status != 200");
      })
      .then((responseData) => {
        // responseData contains orgs list
        console.log(responseData.orgs);
        getOrgIds(responseData.orgs);
        return org_ids;
      })
      .then((orgs) => {
        const promises = [];

        for (let i = 0; i < orgs.length; ++i) {
          promises.push(getElections(orgs[i], user_token));
        }

        Promise.all(promises)
          .then((res) => {
            // store array of election details into async storage
            onValueChange(ELECTIONS_KEY, JSON.stringify(elections));
          })
          .then((res) => {
            return redirectToHome();
          });
      })
      .catch((error) => {
        console.log("Error");
        console.error(error);
      });
  };

  const handleSubmit = () => {
    fetch("https://pollination.live/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) return response.json();
        else throw new Error("status != 200");
      })
      .then((responseData) => {
        // responseData contains jwt_token
        onValueChange(STORAGE_KEY, responseData.jwt_token);
      })
      .then((res) => {
        return getUserToken();
      })
      .then((res) => {
        console.log("----------------getVotingToken-----------------");
        getVotingToken(res);

        let a = getVotingTokenFromStorage();
        console.log("getVotingTokenFromStorage:");
        console.log(a);

        return res;
      })
      .then((res) => {
        console.log("----------------getOrg-----------------");
        getOrg(res);
        return res;
      })
      .catch((error) => {
        console.log("Error");
        console.error(error);
      });
  };

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
        <TextInput label="Email" value={email} onChangeText={onChangeEmail} />
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
          text="Sign In"
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
