import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Modal, Button } from "react-native-paper";

import GlobalStyles from "../constants/GlobalStyles";

// TODO: make show and hideModal required props
const AppModal = ({ show, hideModal, text, buttonText, isClosed }) => {
  const navigation = useNavigation();

  // renders the text warning that states the election has yet to start
  const renderClosedWarning = () => {
    // if election is closed 
    if (isClosed) return <Text>This election has yet to start.</Text>

    return;
  }

  const renderNavigateButton = () => {
    if (!isClosed) { // if election is not closed
      return (
        <Button
          mode="contained"
          onPress={() => {
            hideModal();
            navigation.navigate("BleConnection", {
              // electionType: "Single Choice Vote.",
              electionType: "Multiple Choice Vote",
            });
          }}
          style={[GlobalStyles.center, styles.button]}
        >
          <Text style={styles.text}>Vote</Text>
        </Button>
      );
    }
    
    return;
  };

  return (
    <Modal
      visible={show}
      onDismiss={hideModal}
      contentContainerStyle={GlobalStyles.center}
    >
      <View style={styles.viewContainer}>
        <Text>{text}</Text>
        {renderClosedWarning()}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={hideModal}
            style={[GlobalStyles.center, styles.button]}
          >
            <Text style={styles.text}>Close</Text>
          </Button>
          {renderNavigateButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: "white",
    margin: "auto",
    width: "75%",
    padding: 10,
  },
  buttonContainer: {},
  button: {
    marginTop: 5,
    backgroundColor: "black",
    // bottom: 0,
  },
  text: {
    color: "white",
  },
});

export default AppModal;
