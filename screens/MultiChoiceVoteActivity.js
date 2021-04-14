import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

//Bluetooth Connection
import BleManager from "react-native-ble-manager";

import AppButton from "../components/AppButton";

import { getVotingTokenFromStorage, } from "../utils/apiFunctions";

import { get_current_date_formatted } from "../utils/dateProcess";

// formatter
import { stringToBytes } from "convert-string";
import Question from "../components/Question";
import { QuestionTypes } from "../components/QuestionTypes";

const MAX_SELECTION_ERROR = "You are trying to exceed the maximum selection count.";
const VOTE_SUBMIT_FAILED = "Vote failed. Please try again.";

export default function MultiChoiceVoteActivity({
  voting_token,
  route,
  navigation,
  // questions,
}) {
  // This is needed for the write functions
  const { connected_peripheral, question_json } = route.params;
  const[count, setCount] = useState({});
  const[minCount, setMinCount] = useState(setInitialMinCount(question_json));
  const[minAchieved, setMinAchieved] = useState(false);
  const[snackbarText, setSnackbarText] = useState('');

  const [ballotState, setBallotState] = useState(getInitialState(question_json));

  const getGetHandleTap = getGetGetHandleTap(ballotState, setBallotState);

  // const { connected_peripheral } = "13333333-3333-3333-3333-333333333337";
  console.log(connected_peripheral);
  // const navigation = useNavigation();

  const [checkedItems, setCheckedItems] = useState(null);

  const [question_type, setQuestionType] = useState(null);

  useEffect(() => {
    question_json[0].max_selection_count === 1
      ? setQuestionType("single")
      : setQuestionType("multi");
  }, [question_json]);

  let choices_global = {};
  voting_token = "14efcd7a-ce61-41d3-83f8-d58f440054fc";

  const fetchChoiceFunction = async (choices) => {
    return new Promise(async (resolve, reject) => {
      // await setCheckedItems(choices)
      console.log("checkedItems in MultiChoice");
      console.log(choices);

      // get all the choices
      choices_global = choices;

      let choice_array = [];

      console.log("--------- choices ------------");
      console.log(choices_global);
      console.log("--------- choices ------------");

      for (let item of choices_global) {
        // if the filed is checked
        if (item.isChecked === true) {
          // push that to the array
          choice_array.push({
            question_id: item.question_id,
            option_id: item.option_id,
            order_position: 0,
          });
        }
      }

      // choices_global = choice_array;
      console.log("choice_array");
      console.log(choice_array);

      console.log("=========choices_global==============");
      console.log(choices_global);

      // TODO: change it back to `submit_obj`
      // resolve(test_json_obj)
      resolve(choices_global);
    });
  };

  const [visible, setVisible] = React.useState(false);

  const [bleConnected, setBleConnected] = React.useState(false);

  const handleChoice = () => {
    console.log("Submit Button Pressed! ");
  };

  //
  let submit_obj = {};



  const handleSubmit = async () => {
    let p = new Promise(async (resolve, reject) => {
      // await setCheckedItems(choices)

      const choices = mapStateToChoices(ballotState);

      let voting_token = await getVotingTokenFromStorage();
      let time_stamp = get_current_date_formatted();
      submit_obj = {
        choices: choices,
        time_stamp: time_stamp,
        voting_token: voting_token,
        location: '',
        voter_first_name: '',
        voter_last_name: ''
      };

      resolve(submit_obj);
    });

    p.then((submit_obj) => {
      console.log("sending {submit_obj} to the BLE server ");
      console.log(submit_obj);

      bleWriteMultiChoice(submit_obj);
    });

    // console.log("Submit Button Pressed! ");
    // console.log("THE OBJ IS: ");
    // console.log(obj)

    // bleWriteMultiChoice(checked);

    // Call this if vote has failed
    // setSnackbarText(VOTE_SUBMIT_FAILED);
    // onFailure();
  };

  const onFailure = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  function cloneObj(oldObj) {
    const obj = {};
  
    for (let qid in oldObj) {
      for (let pid in oldObj[qid]) {
        if (!(qid in obj)) {
          obj[qid] = {};
        }
        obj[qid][pid] = oldObj[qid][pid];
      }
    }
    return obj;
  }
  
  
  function handleSingleChoiceState(question_id, option_id, ballotState, setBallotState) {
    let newState = cloneObj(ballotState);
  
    for (let id in ballotState[question_id]) {
      if (id == option_id) {
        newState[question_id][id] = -1;
        let tmp = count;
        tmp[question_id] = 1;
        setCount(tmp);
        updateMinCount(question_id, 1);
      } else {
        newState[question_id][id] = 0;
      }
    }
  
    setBallotState(newState);
  }
  
  function handleMultipleChoiceState(question_id, option_id, ballotState, setBallotState) {
    if (!count[question_id]) {
      let tmp = count;
      tmp[question_id] = 0;
      setCount(tmp);
    }
  
    let newState = cloneObj(ballotState);
    newState[question_id][option_id] = 0;
  
    if (ballotState[question_id][option_id] === 0) {
      question_json.forEach(question => {
        if (question.question_id === question_id) {
          if (count[question_id] === question.max_selection_count) {
            setSnackbarText(MAX_SELECTION_ERROR);
            onFailure();
          } else {
            newState[question_id][option_id] = -1;
            let tmp = count;
            tmp[question_id]++;
            setCount(tmp);
            updateMinCount(question_id, question.min_selection_count);
            console.log(count);
          }
        }
      });
    } else if (ballotState[question_id][option_id] === -1) {
      question_json.forEach(question => {
        if (question.question_id === question_id) {
          newState[question_id][option_id] = 0;
          let tmp = count;
          tmp[question_id]--;
          setCount(tmp);
          updateMinCount(question_id, question.min_selection_count);
          console.log(count);
        }
      });

    }
    setBallotState(newState);
  
  }
  
  function handleOrderedState(question_id, option_id, ballotState, setBallotState) {
    let newState = cloneObj(ballotState);
  
    setBallotState(newState);
  }

  function updateMinAchieved() {
    let minCheck = true;
    for (let count in minCount) {
      if (!minCount[count]) {
        minCheck = false;
        break;
      }
    }
    console.log(`Min Check: ${minCheck}`)
    setMinAchieved(minCheck);
  }

  function updateMinCount(question_id, minSelectionCount) {
    let tmpCount = minCount;
    if (count[question_id] >= minSelectionCount) {
      tmpCount[question_id] = true;
    } else {
      tmpCount[question_id] = false;
    }
    setMinCount(tmpCount);
    console.log(`Min Count: ${minCount}`);
    updateMinAchieved();
  }

  function setInitialMinCount(questions) {
    const tmpState = {};
    questions.forEach(question => {
      tmpState[question.question_id] = false;
    });
    return tmpState;
  }
  
  /**
   *
   * @param questions
   * @return {Object<number, Object<number, number>>}
   */
  function getInitialState(questions) {
    const ballotState = {};
    questions.forEach(question => {
      question.options.forEach(option => {
        if (!(question.question_id in ballotState)) {
          ballotState[question.question_id] = {};
        }
        ballotState[question.question_id][option.option_id] = 0;
      });
    });
    return ballotState;
  }
  
  function getGetGetHandleTap(ballotState, setBallotState) {
    return (question_id, type) => option_id => order => () => {
  
      switch (type) {
        case QuestionTypes.MULTIPLE_CHOICE:
          handleMultipleChoiceState(question_id, option_id, ballotState, setBallotState);
          break;
        case QuestionTypes.SINGLE_CHOICE:
          handleSingleChoiceState(question_id, option_id, ballotState, setBallotState);
          break;
        case QuestionTypes.ORDERED:
          handleOrderedState(question_id, option_id, ballotState, setBallotState);
          break;
      }
  
    };
  }
  
  function Choice(question_id, option_id, order_position) {
    this.question_id = question_id;
    this.option_id = option_id;
    this.order_position = order_position;
  }
  
  /**
   *
   * @param {Object<number, Object<number, number>>} ballotState
   */
  function mapStateToChoices(ballotState) {
    let choices = [];
    for (let qid in ballotState) {
      for (let oid in ballotState[qid]) {
        const selection = ballotState[qid][oid];
        if (selection === 0) {
          continue;
        }
        if (selection === -1) {
          choices.push(new Choice(parseInt(qid), parseInt(oid), 0))
          continue;
        }
        choices.push(new Choice(parseInt(qid), parseInt(oid), selection));
      }
    }
  
    return choices;
  }

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


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {question_json.map(question => <Question key={question.question_id} question={question} getGetHandleTap={getGetHandleTap}
          ballotState={ballotState} />)}
        {/* {renderQuestions(multi_question_test)} */}

        {/* onSubmit should increment count in DB after validating choices */}
        <AppButton
          style={styles.buttonStyle}
          text="Submit"
          onPress={() => {
            handleSubmit();
            navigation.navigate("VoteSuccess")
          }}
          minAchieved={minAchieved}
        />
        <Snackbar
          style={styles.snackBar}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {snackbarText}
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
