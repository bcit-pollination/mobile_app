import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Snackbar, Checkbox } from "react-native-paper";

import AppButton from "../components/AppButton";
import QuestionCheckboxes from "../components/QuestionCheckboxes";

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
];

export default function MultiChoiceVoteActivity({ questions }) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  // const [checked, setChecked] = React.useState({
  //   choice1: false,
  //   choice2: false,
  // });

  const handleChoice = () => {
    console.log("Submit Button Pressed! ");

    // Call this if vote has failed
    // onFailure();
  };

  const onFailure = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const renderCheckedStates = (numItems) => {
    let obj = {};

    for (let i = 0; i < numItems; i++) {
      obj[i] = false;
    }

    return obj;
  };

  const setStatus = (status) => {
    return status === "checked" ? false : true;
  };

  const renderQuestions = (questions) => {
    let arr = [];

    // renderCheckedStates(questions.length);

    arr = questions.map((curQuestion, index) => {
      return (
        <View key={index}>
          <Text style={styles.title}>
            Question {curQuestion.question_num}:{" "}
          </Text>
          <Text style={styles.title}>{curQuestion.description} </Text>

          <View style={styles.checkboxContainer}>
            {/* {renderCheckBoxes(curQuestion.opts, index)} */}
            <QuestionCheckboxes options={curQuestion.opts} />
          </View>
        </View>
      );
    });
    
    return arr;
  };

  return (
    <View style={styles.container}>
      {renderQuestions(test_json_obj)}

      <AppButton
        style={styles.buttonStyle}
        text="Submit"
        onPress={() => {
          handleChoice();
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 20,
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
