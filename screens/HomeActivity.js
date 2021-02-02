import React, {useState} from "react";
import { StyleSheet, View, Text, Button, Image, Linking } from "react-native";
import DetailsModal from "../components/DetailsModal";
import ElectionItem from "../components/ElectionItem";

import GlobalStyles from "../constants/GlobalStyles";

const HomeActivity = () => {
   // modal is not shown at first
   const [show, setShow] = useState(false);

  const changeShowModal = () => {
    setShow(!show);
  };

  // TODO: dynamically load info to the modal from database
  return (
    <View style={GlobalStyles.genericPage}>
      <DetailsModal info="this is modal" visible={show} show={show} setShow={setShow} />
      <View style={[styles.headingContainer, GlobalStyles.center]}>
        <Text style={styles.headingText}>Active Elections</Text>
      </View>
      <View style={styles.electionsListContainer}>
        <ElectionItem title="Election 1" onLongPress={changeShowModal} />
        <ElectionItem title="Election 2" onLongPress={changeShowModal} />
        <ElectionItem title="Election 3" onLongPress={changeShowModal} />
      </View>
    </View>
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
