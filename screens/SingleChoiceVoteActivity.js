import React from 'react'
import { StyleSheet, View, Text, ToastAndroid, Platform, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper'
import RadioButton from '../components/RadioButton';
import AppButton from '../components/AppButton';

// formatter
import { stringToBytes } from "convert-string";


const items = [
  {
    key: 'Pizza',
    text: 'Pizza',
    selected: false,
  },
  {
    key: 'Lasagna',
    text: 'Lasagna',
    selected: false,
  },
  {
    key: 'Gnocchi',
    text: 'Gnocchi',
    selected: false,
  },
];


import BleManager from 'react-native-ble-manager';


export default function SingleChoiceVoteActivity({ route, navigation }) {
  const { connected_peripheral } = route.params;

  const [visible, setVisible] = React.useState(false);

  // bleConnected
  const [bleConnected, setBleConnected] = React.useState(false)

  const [singleChoiceSelected, setSelectedSingleChoice] = React.useState("null")

  // writing for single choice
  const bleWriteSingleChoice = (text_to_send) => {

    BleManager.connect(connected_peripheral).then((res) => {

      BleManager.retrieveServices(connected_peripheral).then((peripheralInfo) => {
        console.log('peripheralInfo', peripheralInfo.services);


        console.log('---------- text to send--------')
        console.log(`string: ${text_to_send}`);
        console.log(`string: ${stringToBytes(text_to_send)}`);
        console.log('---------- text to send --------')

        // service uuid for: Writing vote-info to rPi 
        var service = '13333333-3333-3333-3333-333333333337';
        // character uuid for: doing single votes
        var voteCharacteristic = '13333333-3333-3333-3333-333333330003';

        console.log('---------- write---------------------')
        BleManager.startNotification(connected_peripheral, service, voteCharacteristic).then(() => {
          setTimeout(() => {

            BleManager.write(connected_peripheral, service, voteCharacteristic, stringToBytes(text_to_send)).then(() => {
              console.log(`msg sent ${stringToBytes(text_to_send)}`);
            })

            console.log('Sent?????')
            this.alert("message sent!");
          })
            .catch((err) => {
              console.log('failed to send')
              console.log(err)
              this.alert("failed to send");
            });
        }, 500);
      })
    })
  }

  // const handleChoice = (items) => {
  //   console.log("Submit Button Pressed! ");
  //   console.log(items);

  //   items.forEach(element => {
  //     if (element.selected) {
  //       console.log("Submitting option: ", element.text)
  //       setSelectedSingleChoice(element.text)

  //       setTimeout(() => {
  //         console.log(singleChoiceSelected)
  //         bleWriteSingleChoice(singleChoiceSelected)
  //       }, 2000);

  //     }
  //   });




  // Call this if vote has failed
  // onFailure();
  // }

  //passed in as onPressAction; 
  const handleChoice = (choice) => {
    setSelectedSingleChoice(choice);
    console.log(choice)
  }

  // submit via BLE
  const handleSubmit = () => {
    console.log(singleChoiceSelected)
    bleWriteSingleChoice(singleChoiceSelected)
  }


  const onFailure = () => {
    setVisible(!visible);
  }

  const onDismissSnackBar = () => {
    setVisible(false);
  }

  return (
    <View style={[
      styles.container,
    ]}>
      <Text>Select only 1: </Text>
      <RadioButton ITEMS={items} textColor='black' buttonColor='rgb(0,0,100)' onPressAction={handleChoice} />

      < AppButton text="Submit" onPress={
        () => {
          handleSubmit();
          // navigation.navigate("VoteSuccess");
        }
      } />

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration="3000"
      >
        Vote failed. Please try again.
      </Snackbar>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
