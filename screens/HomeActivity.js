import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

import DetailsModal from "../components/old/DetailsModal";
import ElectionItem from "../components/ElectionItem";

import GlobalStyles from "../constants/GlobalStyles";
import BluetoothFailModal from "../components/old/BluetoothFailModal";
import AppModal from "../components/AppModal";
import { abs } from "react-native-reanimated";
import { resolve } from "uri-js";

const HomeActivity = () => {
  const VOTING_STORAGE = 'voting_token';
  let org_ids = [];
  let elections = [];

  //BLE connected?
  const [showBleConnection, setShowBleConnection] = useState(false);

  // Gets user's jwt_token from AsyncStorage
  const getUserToken = async () => {
    let USER_TOKEN = await AsyncStorage.getItem("jwt_token");
    return USER_TOKEN;
  };

  const onValueChange = async (item, selectedValue) => {
    try {
      console.log("selected value: " + selectedValue);
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  // Gets user's voting token
  const getVotingToken = (user_token) => {
    fetch("http://pollination.live/api/user/voting_token", {
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
        console.log("checking type: " + typeof(responseData.voting_token[0]));
        onValueChange(VOTING_STORAGE, responseData.voting_token[0]);
      })
      .catch((error) => {
        console.log("Error");
        console.error(error);
      });
  };

  // fill in array of org_ids
  const getOrgIds = (org_list) => {
    org_ids = org_list.map((org) => {
      return org.org_id;
    });
  };

  // get all elections in elections array
  const getElections = (orgs, token) => {
    for (let i = 0; i < orgs.length; i++) {
      console.log("orgs[i]: " + parseInt(orgs[i]));
      fetch(
        `http://pollination.live/api/org/elections/list?org_id=${orgs[i]}`,
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
      });
    }
  };

  const getOrg = (user_token) => {
    fetch("http://pollination.live/api/org/list", {
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
        return getElections(orgs, user_token);
      })
      .catch((error) => {
        console.log("Error");
        console.error(error);
      });
  };

  //getting user token
  getUserToken().then((res) => {
    getOrg(res);
    getVotingToken(res);
  });

  const navigation = useNavigation();

  // modal is not shown at first
  const [showElectionDetails, setShowElectionDetails] = useState(false);

  const [showTip, setShowTip] = useState(false);

  // const changeShowDetailsModal = () => {
  //   setShowElectionDetails(!showElectionDetails);
  // };

  // const changeShowTipModal = () => {
  //   setShowElectionDetails(!showElectionDetails);
  // };

  const showBleSettings = () => setShowBleConnection(true);

  const showDetailsModal = () => setShowElectionDetails(true);
  const hideDetailsModal = () => setShowElectionDetails(false);
  const showTipModal = () => setShowTip(true);
  const hideTipModal = () => setShowTip(false);

  // TODO: add a '?' icon and place it in a corner with an onPress
  // that details how to show election information (onLongPress)

  const sampleElectionDetails =
    "Election Details: \nJanuary 20 - March 15\nLower Mainland";
  const sampleTip =
    "Long press one of the election items to show further details about an election.";

  const onTipPress = () => {
    showTipModal();
  };

  // TODO: dynamically load info to the modal from database
  return (
    <Provider>
      <View style={[GlobalStyles.genericPage, styles.container]}>
        <Pressable style={styles.tipContainer} onPress={onTipPress}>
          <AntDesign name="question" size={24} color="black" />
        </Pressable>
        <Portal>
          {/* <DetailsModal info="this is modal" visible={show} show={show} setShow={setShow} /> */}
          <AppModal
            show={showElectionDetails}
            hideModal={hideDetailsModal}
            text={sampleElectionDetails}
          />
          <AppModal show={showTip} hideModal={hideTipModal} text={sampleTip} />
          {/* <DetailsModal show={showElectionDetails} hideModal={hideDetailsModal} /> */}
          {/* for testing purposes */}
          {/* <BluetoothFailModal show={show} hideModal={hideModal} /> */}
        </Portal>
        <View style={[styles.headingContainer, GlobalStyles.center]}>
          <Text style={styles.headingText}>Active Elections</Text>
        </View>
        <View style={styles.electionsListContainer}>
          <ElectionItem
            title="Single Choice Vote"
            //parameter is passed in for later redirection, after bluetooth is connected!
            onPress={() =>
              navigation.navigate("BleConnection", {
                electionType: "Single Choice Vote",
              })
            }
            onLongPress={showDetailsModal}
          />
          <ElectionItem
            title="Multiple Choice Vote"
            onLongPress={showDetailsModal}
            onPress={() =>
              navigation.navigate("BleConnection", {
                electionType: "Multiple Choice Vote",
              })
            }
          />
          <ElectionItem
            title="Yes/No Vote"
            onLongPress={showDetailsModal}
            onPress={() =>
              navigation.navigate("BleConnection", {
                electionType: "Yes No Vote",
              })
            }
          />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tipContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  headingContainer: {
    flex: 1,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  electionsListContainer: {
    flex: 3,
    paddingVertical: 10,
    width: "70%",
    maxWidth: "70%",
  },
});

export default HomeActivity;
