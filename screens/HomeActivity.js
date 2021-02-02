import React from "react";
import { StyleSheet, View, Text, Button, Image, Linking } from "react-native";
import DetailsModal from "../components/DetailsModal";
import ElectionItem from "../components/ElectionItem";

import GlobalStyles from "../constants/GlobalStyles";

const HomeActivity = () => {
  return (
    <View style={GlobalStyles.genericPage}>
      <DetailsModal info="this is modal" />
      <View style={[styles.headingContainer, GlobalStyles.center]}>
        <Text style={styles.headingText}>Active Elections</Text>
      </View>
      <View style={styles.electionsListContainer}>
        <ElectionItem title="Election 1" />
        <ElectionItem title="Election 2" />
        <ElectionItem title="Election 3" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "black",
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
