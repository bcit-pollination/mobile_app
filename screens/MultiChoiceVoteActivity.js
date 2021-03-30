import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Snackbar, Checkbox } from "react-native-paper";

//Bluetooth Connection
import BleManager from "react-native-ble-manager";

import AppButton from "../components/AppButton";
import QuestionCheckboxes from "../components/QuestionCheckboxes";
import RadioButton from "../components/RadioButton";

import {
  // getVotingToken,
  // onValueChange,
  getVotingTokenFromStorage,
} from "../utils/apiFunctions";

import { get_current_date_formatted } from "../utils/dateProcess";

// formatter
import { stringToBytes } from "convert-string";

let test_json_obj = {
  choices: [
    {
      option_id: 1,
      option_description: "Sandwich",
      _id: "6046757f2801bc7728000005",
      isChecked: true,
    },
    {
      option_num: 2,
      option_description: "Pizza",
      _id: "6046757f2801bc7728000004",
      isChecked: true,
    },
    {
      option_num: 3,
      option_description: "SuShi",
      _id: "6046757f2801bc7728000003",
      isChecked: true,
    },
  ],
  voting_token: "14efcd7a-ce61-41d3-83f8-d58f440054fc",
  time_stamp: 1615275694130,
};

// var multi_question_test = [{
//   question_id: 1,
//   question_description: "Quel est votre plat préféré ?",
//   min_selection_count: 1,
//   max_selection_count: 5,
//   ordered_choices: false,
//   'options': [
//     {
//       option_id: 1,
//       option_description: "Sandwich",
//     },
//     {
//       option_id: 2,
//       option_description: "Pizza",
//     },
//     {
//       option_id: 3,
//       option_description: "SuShi",
//     }
//   ]
// }];

export default function MultiChoiceVoteActivity({
  voting_token,
  route,
  navigation,
  // questions,
}) {
  // This is needed for the write functions
  const { connected_peripheral, question_json } = route.params;
  // const { connected_peripheral } = "13333333-3333-3333-3333-333333333337";
  console.log(connected_peripheral);
  // const navigation = useNavigation();

  const [checkedItems, setCheckedItems] = useState(null);

  const [question_type, setQuestionType] = useState(null);

  const [submission_object, setObjectToSubmit] = useState([]);

  useEffect(() => {
    question_json[0].max_selection_count == 1
      ? setQuestionType("single")
      : setQuestionType("multi");
  }, [question_json]);

  let choices_global = {};
  voting_token = "14efcd7a-ce61-41d3-83f8-d58f440054fc";

  const notifyChoice = (choices) => {
    // await setCheckedItems(choices)
    console.log("checkedItems in MultiChoice");
    console.log(choices);

    // // get all the choices
    // choices_global = choices;

    let choice_array = [];

    console.log("--------- choices ------------");
    console.log(choices_global);
    console.log(choices)
    console.log("--------- choices ------------");

    for (let item of choices) {
      // if the filed is checked
      if (item.isChecked == true) {
        // push that to the array
        choice_array.push({
          question_id: item.question_id,
          option_id: item.option_id,
          order_position: 0,
        });
      }
    }

    choices_global = choice_array;

    setObjectToSubmit(choice_array)

    console.log("choice_array");
    console.log(choice_array);

    console.log("=========choices_global==============");
    console.log(choices_global);

    // TODO: change it back to `submit_obj`
    // resolve(test_json_obj)


  };

  const [visible, setVisible] = React.useState(false);

  const [bleConnected, setBleConnected] = React.useState(false);

  const handleChoice = () => {
    console.log("Submit Button Pressed! ");
  };

  //
  let submit_obj = {};

  // let choices = [
  //   {
  //     "option_id": 1,
  //     "option_description": "Sandwich",
  //     "_id": "6046757f2801bc7728000005",
  //     "isChecked": true
  //   },
  //   {
  //     "option_num": 2,
  //     "option_description": "Pizza",
  //     "_id": "6046757f2801bc7728000004",
  //     "isChecked": true
  //   },
  //   {
  //     "option_num": 3,
  //     "option_description": "SuShi",
  //     "_id": "6046757f2801bc7728000003",
  //     "isChecked": true
  //   }]

  const handleSubmit = async () => {
    let p = new Promise(async (resolve, reject) => {
      // await setCheckedItems(choices)

      let voting_token = await getVotingTokenFromStorage();
      console.log(
        "%%%%%%%%%%%%%%%%%%% let voting_token = getVotingTokenFromStorage()%%%%%%%%%%%%%%%%%%"
      );
      console.log(voting_token);
      let time_stamp = get_current_date_formatted();
      submit_obj = {
        choices: choices_global,
        voting_token,
        time_stamp: time_stamp,
        voting_token: voting_token,
      };

      resolve(submit_obj);
    });

    p.then((submit_obj) => {
      console.log("sending {submit_obj} to the BLE server ");
      console.log(submit_obj);

      bleWriteMultiChoice(submission_object);
    });

    // console.log("Submit Button Pressed! ");
    // console.log("THE OBJ IS: ");
    // console.log(obj)

    // bleWriteMultiChoice(checked);

    // Call this if vote has failed
    // onFailure();
  };

  const onFailure = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  // writing for single choice
  const bleWriteMultiChoice = (text_to_send) => {
    BleManager.connect(connected_peripheral).then((res) => {
      BleManager.retrieveServices(connected_peripheral).then(
        (peripheralInfo) => {
          console.log("peripheralInfo", peripheralInfo.services);
          console.log("");
          console.log("---------- text to send--------");
          console.log(`string: ${JSON.stringify(text_to_send)}`);
          console.log("---------- text to send --------");

          // service uuid for: Writing vote-info to rPi
          var service = "13333333-3333-3333-3333-333333333337";

          // character uuid for: doing single votes
          var voteCharacteristic = "13333333-3333-3333-3333-333333330009";

          BleManager.startNotification(
            connected_peripheral,
            service,
            voteCharacteristic
          ).then(() => {
            // (1223)
            let text_to_send2 = JSON.stringify(text_to_send);

            console.log("text_to_send.length()" + text_to_send2.length);
            let text_to_send_buffer = `${text_to_send2.length} ${text_to_send2}`;

            let remaining_msg = text_to_send_buffer;

            // "Hello folks, lets test if this one works, this is just a long string!!!! Sending from Mobile to the rPi"
            let slice_index = 0;

            console.log(text_to_send_buffer);

            //While it still have some data to send:

            BleManager.write(
              connected_peripheral,
              service,
              voteCharacteristic,
              stringToBytes(text_to_send2),
              text_to_send2.length
            ).then(() => {
              console.log("done!");
            });
            // setTimeout(() => {
            //   BleManager.write(
            //     connected_peripheral,
            //     service,
            //     voteCharacteristic,
            //     stringToBytes(text_to_send_buffer)
            //   ).then(() => {
            //     console.log(`msg sent ${stringToBytes(text_to_send_buffer)}`);
            //     this.alert("message sent!");

            //     while (remaining_msg.length - 20 >= 20) {
            //       slice_index += 20;
            //       to_send_buffer = text_to_send_buffer.slice(
            //         slice_index,
            //         slice_index + 20
            //       );

            //       remaining_msg = remaining_msg.slice(slice_index, -1);

            //       console.log("text_to_send_buffer: " + to_send_buffer);

            //       console.log("splice_index: " + slice_index);

            //       BleManager.write(
            //         connected_peripheral,
            //         service,
            //         voteCharacteristic,
            //         stringToBytes(to_send_buffer)
            //       ).then(() => {
            //         console.log(`msg sent ${stringToBytes(to_send_buffer)}`);
            //         // this.alert("message sent!");
            //       });
            //     }
            //   });
            // }, 500);
          });
        }
      );
    });
  };

  const renderQuestions = (questions) => {
    let arr = [];

    arr = questions.map((curQuestion, index) => {
      return (
        <View key={index} style={styles.questionContainerView}>
          <Text style={styles.title}>Question {curQuestion.question_id}: </Text>

          <Text style={styles.description}>
            {curQuestion.question_description}{" "}
          </Text>

          <View style={styles.checkboxContainer}>
            {/* {renderCheckBoxes(curQuestion.opts, index)} */}
            {question_type === "single" && (
              <RadioButton
                options={curQuestion.options}
                onPressAction={notifyChoice}
                textColor="black"
                buttonColor="rgb(0,0,100)"
              />
            )}
            {question_type === "multi" && (
              <QuestionCheckboxes
                options={curQuestion.options}
                fetchChoiceFunction={notifyChoice}
              />
            )}
          </View>
        </View>
      );
    });

    return arr;
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {renderQuestions(question_json)}
        {/* {renderQuestions(multi_question_test)} */}

        {/* onSubmit should increment count in DB after validating choices */}
        <AppButton
          style={styles.buttonStyle}
          text="Submit"
          onPress={() => {
            handleSubmit();
            navigation.navigate("VoteSuccess");
          }}
        />
        <Snackbar
          style={styles.snackBar}
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration="3000"
        >
          Vote failed. Please try again.
        </Snackbar>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionContainerView: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderStyle: 'solid'
    margin: 2,
    marginBottom: 15,
  },
  title: {
    margin: 15,
    color: "red",
    fontSize: 20,
    // backgroundColor: 'yellow'
  },
  description: {
    margin: 15,
    color: "black",
    fontSize: 20,
    // backgroundColor: 'rgb(242, 214, 75)'
  },

  item: {
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
  },
  checkboxContainer: {
    width: 250,
  },
  buttonStyle: {
    margin: 10,
  },
  snackBar: {
    alignSelf: "flex-end",
  },
});
