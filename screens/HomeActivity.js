import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
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

// util functions
import {
  getVotingToken,
  // getOrgIds,
  // getElections,
  // getOrg,
  getUserToken,
  onValueChange,
  getVotingTokenFromStorage,
} from "../utils/apiFunctions";

const HomeActivity = () => {
  // boolean to activate dynamic render of elections
  const [render, setRender] = useState(false);

  // array that contains the actual election objects
  // const [elections, setElections] = useState([]);

  // array that contains the components to be rendered
  const [electionComponents, setElectionComponents] = useState([]);

  // adds an election object to the elections array
  // const addElection = (newElection) => {
  //   setElections((oldState) => [...oldState, newElection]);
  // };

  //BLE connected?
  const [showBleConnection, setShowBleConnection] = useState(false);

  // console.log("----------------getUserToken-----------------");
  console.log("in HomeActivity");

  //getting user token

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

  const getElectionsArr = async () => {
    let ELECTIONS_ARR = await AsyncStorage.getItem("elections_arr");
    return ELECTIONS_ARR;
  };

  const convertElections = (elections) => {
    let arr = [];

    console.log("elections within renderElections()");
    console.log(elections);

    arr = elections.map((curElection, index) => {
      return (
        <ElectionItem
          key={index}
          title={curElection.election_description}
          //parameter is passed in for later redirection, after bluetooth is connected!
          onPress={() =>
            navigation.navigate("BleConnection", {
              electionType: "Single Choice Vote",
            })
            // console.log("pressed")
          }
          onLongPress={showDetailsModal}
        />
      );
    });

    console.log("setting election component");
    console.log(arr);
    if (arr.length > 0) {
      console.log("arr.length > 0; setElectionComponents()");
      setElectionComponents(arr);
    } else {
      console.log("arr.length <= 0");
    }

    return arr;
  };

  const getData = () => {
    getElectionsArr().then((res) => {
      console.log("res from getElectionsArr()");
      console.log(res);
      convertElections(JSON.parse(res));
      // setElectionComponents(JSON.parse(res));
    });
  }

  useEffect(() => {
    getData();
    // const interval = setTimeout(() => {
    //   getData();
    // }, 2000);
  }, []);
 

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.tipContainer} onPress={onTipPress}>
          <AntDesign name="question" size={24} color="black" />
        </Pressable>
        <Portal>
          <AppModal
            show={showElectionDetails}
            hideModal={hideDetailsModal}
            text={sampleElectionDetails}
          />
          <AppModal show={showTip} hideModal={hideTipModal} text={sampleTip} />
        </Portal>
        <View style={[styles.headingContainer, GlobalStyles.center]}>
          <Text style={styles.headingText}>Active Elections</Text>
        </View>
        <View style={styles.electionsListContainer}>
          {electionComponents}
          {/* <ElectionItem
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
          /> */}
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tipContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  headingContainer: {
    // flex: 1,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  electionsListContainer: {
    // flex: 3,
    paddingVertical: 10,
    width: "70%",
    maxWidth: "70%",
  },
});

export default HomeActivity;
