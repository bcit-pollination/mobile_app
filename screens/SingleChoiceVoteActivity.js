import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import RadioButton from "../components/RadioButton";
import AppButton from "../components/AppButton";
// import { ScrollView } from "react-native-gesture-handler";

// formatter
import { stringToBytes } from "convert-string";
import {
  get_current_date_formatted

} from '../utils/dateProcess'

// const items = [
//   {
//     key: 'Pizza',
//     text: 'Pizza',
//     selected: false,
//   },
//   {
//     key: 'Lasagna',
//     text: 'Lasagna',
//     selected: false,
//   },
//   {
//     key: 'Gnocchi',
//     text: 'Gnocchi',
//     selected: false,
//   },
// ];

import BleManager from "react-native-ble-manager";

const test_json_obj = [
  {
    question_num: 1,
    description: "Quel est votre plat préféré ?",
    selection_limit: 1,
    opts: [
      {
        option_num: 1,
        description: "Sandwich",
        count: 0,
      },
      {
        option_num: 2,
        description: "Pizza",
        count: 0,
      },
      {
        option_num: 3,
        description: "SuShi",
        count: 0,
      },
    ],
  },
  {
    question_num: 2,
    description: "Quel est votre plat préféré ?",
    selection_limit: 1,
    opts: [
      {
        option_num: 1,
        description: "Sandwich",
        count: 0,
      },
      {
        option_num: 2,
        description: "Pizza",
        count: 0,
      },
      {
        option_num: 3,
        description: "SuShi",
        count: 0,
      },
    ],
  },
  {
    question_num: 3,
    description: "Quel est votre plat préféré ?",
    selection_limit: 1,
    opts: [
      {
        option_num: 1,
        description: "Sandwich",
        count: 0,
      },
      {
        option_num: 2,
        description: "Pizza",
        count: 0,
      },
      {
        option_num: 3,
        description: "SuShi",
        count: 0,
      },
    ],
  },
];


const SingleChoiceVoteActivity = ({ question, route, navigation }) => {
  const { connected_peripheral } = route.params;

  // bleConnected
  const [bleConnected, setBleConnected] = React.useState(false);

  const [singleChoiceSelected, setSelectedSingleChoice] = React.useState(
    "null"
  );

  // writing for single choice
  const bleWriteSingleChoice = (text_to_send) => {
    BleManager.connect(connected_peripheral).then((res) => {
      BleManager.retrieveServices(connected_peripheral).then(
        (peripheralInfo) => {
          console.log("peripheralInfo", peripheralInfo.services);

          console.log("---------- text to send--------");
          console.log(`string: ${text_to_send}`);
          console.log(`string: ${stringToBytes(text_to_send)}`);
          console.log("---------- text to send --------");

          // service uuid for: Writing vote-info to rPi
          var service = "13333333-3333-3333-3333-333333333337";
          // character uuid for: doing single votes
          var voteCharacteristic = "13333333-3333-3333-3333-333333330003";

          console.log("---------- write---------------------");
          BleManager.startNotification(
            connected_peripheral,
            service,
            voteCharacteristic
          ).then(() => {
            setTimeout(() => {
              BleManager.write(
                connected_peripheral,
                service,
                voteCharacteristic,
                stringToBytes(text_to_send)
              ).then(() => {
                console.log(`msg sent ${stringToBytes(text_to_send)}`);
              });

              console.log("Sent?????");
              this.alert("message sent!");
            }).catch((err) => {
              console.log("failed to send");
              console.log(err);
              this.alert("failed to send");
            });
          }, 500);
        }
      );
    });
  };

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
    console.log(choice);
  };

  let submit_obj = {
  }

  // submit via BLE
  const handleSubmit = () => {
    console.log(singleChoiceSelected);
    bleWriteSingleChoice(singleChoiceSelected);

    submit_obj = {
      choices: choices_global,
      voting_token,
      time_stamp: get_current_date_formatted,
      voting_token: voting_token
    }
  };

  const onFailure = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };


  const [visible, setVisible] = useState(false);

  // const handleChoice = (items) => {
  //   console.log("Submit Button Pressed! ");
  //   console.log(items);

  //   // items.forEach((element) => {
  //   //   element.selected
  //   //     ? console.log("Submitting option: ", element.text)
  //   //     : null;
  //   // });

  //   // Call this if vote has failed
  //   // onFailure();
  // };


  const renderQuestions = (questions) => {
    let arr = [];

    arr = questions.map((curQuestion, index) => {
      return (
        <View key={index} style={styles.questionContainer}>
          <Text>{curQuestion.description}</Text>
          <RadioButton
            options={curQuestion.opts}
            textColor="black"
            buttonColor="rgb(0,0,100)"
          />
        </View>
      );
    });

    return arr;
  };

  return (
    // <View style={{flex: 1}}>
    <ScrollView contentContainerStyle={[styles.container]}>
      {renderQuestions(test_json_obj)}
      <AppButton
        text="Submit"
        onPress={() => {
          handleSubmit();
          // navigation.navigate("VoteSuccess");
        }}
      />
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration="3000">
        Vote failed. Please try again.
      </Snackbar>
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // important for scrollview
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  questionContainer: {
    marginVertical: 10,
  },
});

export default SingleChoiceVoteActivity;
