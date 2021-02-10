import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DetailsModal from "../components/DetailsModal";
import ElectionItem from "../components/ElectionItem";

import GlobalStyles from "../constants/GlobalStyles";

const HomeActivity = () => {
  const navigation = useNavigation();
  // modal is not shown at first
  const [show, setShow] = useState(false);

  const changeShowModal = () => {
    setShow(!show);
  };

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  // TODO: add a '?' icon and place it in a corner with an onPress
  // that details how to show election information (onLongPress)

  // TODO: dynamically load info to the modal from database
  return (
    <Provider>
      <View style={GlobalStyles.genericPage}>
        {/* <DetailsModal info="this is modal" visible={show} show={show} setShow={setShow} /> */}
        <Portal>
          <DetailsModal show={show} hideModal={hideModal} />
        </Portal>
        <View style={[styles.headingContainer, GlobalStyles.center]}>
          <Text style={styles.headingText}>Active Elections</Text>
        </View>
        <View style={styles.electionsListContainer}>
          <ElectionItem title="Single Choice Vote" 
            onPress={()=> navigation.navigate("SingleChoiceVote")}
            onLongPress={showModal} 
          />
          <ElectionItem title="Multiple Choice Vote" onLongPress={showModal} />
          <ElectionItem title="Yes/No Vote" onLongPress={showModal} />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
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
