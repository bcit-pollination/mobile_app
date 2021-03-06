import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from "@expo/vector-icons";

import DetailsModal from "../components/old/DetailsModal";
import ElectionItem from "../components/ElectionItem";

import GlobalStyles from "../constants/GlobalStyles";
import BluetoothFailModal from "../components/old/BluetoothFailModal";
import AppModal from "../components/AppModal";
import { abs } from "react-native-reanimated";

const HomeActivity = () => {
  // Gets user's jwt_token from AsyncStorage
  const getUserToken = async() => {
    let USER_TOKEN = await AsyncStorage.getItem('jwt_token');
  }
  
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
  }

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
            onPress={() => navigation.navigate("SingleChoiceVote")}
            onLongPress={showDetailsModal}
          />
          <ElectionItem
            title="Multiple Choice Vote"
            onLongPress={showDetailsModal}
            onPress={()=> navigation.navigate("MultiChoiceVote")}
          />
          <ElectionItem title="Yes/No Vote" onLongPress={showDetailsModal} />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tipContainer: {
    position: 'absolute',
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
