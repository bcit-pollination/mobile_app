import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Snackbar, Checkbox } from "react-native-paper";

import AppButton from "../components/AppButton";

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
  const [visible, setVisible] = React.useState(false);

  const [checked, setChecked] = React.useState({
    choice1: false,
    choice2: false,
  });

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

  // "questions": [
  //   {
  //     "description": "",
  //     "choice_limit": 1,
  //     "question_num": 1,
  //     "opts": [
  //       {
  //         "description": "",
  //         "option_num": 1,
  //         "count": 0
  //       }
  //     ]
  //   }
  // ]

  const renderQuestions = (questions) => {
    let arr = [];

    arr = questions.map((curQuestion, index) => {
      return (
        <View key={index}>
          <Text style={styles.title}>
            Question {curQuestion.question_num}:{" "}
          </Text>
          <Text style={styles.title}>{curQuestion.description} </Text>

          {/* <Text style={styles.title}>Select: </Text> */}
          <View style={styles.checkboxContainer}>
            {renderCheckBoxes(curQuestion.opts)}
          </View>
        </View>
      );
    });

    return arr;
  };

  const renderCheckBoxes = (options) => {
    // array to hold dynamically rendered items
    let arr = [];

    arr = options.map((curOption, index) => {
      return (
        <Checkbox.Item
          key={index}
          style={styles.item}
          status={checked.choice1 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked((checked) => ({
              ...checked,
              choice1: !checked.choice1,
            }));
          }}
          color="#000"
          label={curOption.description}
        />
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
