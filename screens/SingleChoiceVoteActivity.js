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
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import RadioButton from "../components/RadioButton";
import AppButton from "../components/AppButton";
// import { ScrollView } from "react-native-gesture-handler";

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

export default function SingleChoiceVoteActivity({ questions }) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const handleChoice = (items) => {
    console.log("Submit Button Pressed! ");
    console.log(items);

    // items.forEach((element) => {
    //   element.selected
    //     ? console.log("Submitting option: ", element.text)
    //     : null;
    // });

    // Call this if vote has failed
    // onFailure();
  };

  const onFailure = () => {
    setVisible(!visible);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

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
            // handleChoice();
            navigation.navigate("VoteSuccess");
          }}
        />
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration="3000"
        >
          Vote failed. Please try again.
        </Snackbar>
      </ScrollView>
    // </View>
  );
}

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
