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

// util functions
import {
  getVotingToken,
  getOrgIds,
  getElections,
  getOrg,
  getUserToken,
  onValueChange,
  getVotingTokenFromStorage,
} from "../utils/apiFunctions";

const HomeActivity = () => {
  const VOTING_STORAGE = "voting_token";
  let org_ids = [];
  let elections = [];

  // boolean to activate dynamic render of elections
  const [render, setRender] = useState(false);

  //BLE connected?
  const [showBleConnection, setShowBleConnection] = useState(false);

  //getting user token
  getUserToken()
    .then((res) => {
      console.log("----------------getUserToken-----------------");
      getOrg(res);
      getVotingToken(res);

      let a = getVotingTokenFromStorage();
      console.log("getVotingTokenFromStorage:");
      console.log(a);
    })
    .then((res) => {
      console.log("setRender to true");
      console.log("should render elections now");
      setRender();
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

  const renderElections = (elections) => {
    let arr = [];

    arr = elections.map((curElection, index) => {
      console.log("Election Details:");
      console.log("election_description: " + curElection.election_description);
      console.log("end_time: " + curElection.end_time);
      console.log("anonymous: ");
      console.log(curElection.anonymous);
      console.log("org_id: " + parseInt(curElection.org_id));
      return (
        <ElectionItem
          key={index}
          title={curElection.election_description}
          //parameter is passed in for later redirection, after bluetooth is connected!
          onPress={() =>
            // navigation.navigate("BleConnection", {
            //   electionType: "Single Choice Vote",
            // })
            console.log("pressed")
          }
          onLongPress={showDetailsModal}
        />
      );
    });

    return arr;
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
          {useEffect(() => {
            if (render) {
              renderElections(elections);
            }
          }, [render])}
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
