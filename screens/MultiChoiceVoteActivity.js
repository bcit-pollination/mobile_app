import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Snackbar, Checkbox } from 'react-native-paper'

import AppButton from '../components/AppButton';

export default function MultiChoiceVoteActivity() {

  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const [bleConnected, setBleConnected] = React.useState(false)

  const [checked, setChecked] = React.useState({
    choice1: false,
    choice2: false,
  });

  const handleChoice = () => {
    console.log("Submit Button Pressed! ");

    // Call this if vote has failed
    // onFailure();
  }

  const onFailure = () => {
    setVisible(!visible);
  }

  const onDismissSnackBar = () => {
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select multiple: </Text>

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          style={styles.item}
          status={checked.choice1 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(checked => ({ ...checked, choice1: !checked.choice1 }));
          }}
          color="#000"
          label="Item 1"
        />
        <Checkbox.Item
          style={styles.item}
          status={checked.choice2 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(checked => ({ ...checked, choice2: !checked.choice2 }));
          }}
          color="#000"
          label="Item 2"
        />
      </View>

      {bleConnected && <AppButton style={styles.buttonStyle} text="Submit" onPress={
        () => {
          handleChoice();
          navigation.navigate("VoteSuccess");
        }
      } />}

      {!bleConnected && <AppButton style={styles.buttonStyle} text="Connect to Bluetooth" onPress={
        () => {
          handleChoice();
          navigation.navigate("BleConnection");
        }
      } />}


      <Snackbar
        style={styles.snackBar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration="3000"
      >
        Vote failed. Please try again.
        </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    margin: 20
  },
  item: {
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
  },
  checkboxContainer: {
    width: 250,
  },
  buttonStyle: {
    margin: 10,
  },
  snackBar: {
    alignSelf: 'flex-end'
  }
});
