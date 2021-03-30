import { StyleSheet, Text, View } from "react-native";
import RadioButton from "./RadioButton";
import QuestionCheckboxes from "./QuestionCheckboxes";
import React from 'react'
import KRadioButton from "./KRadioButton";
import KCheckBox from "./kCheckBox";
import { QuestionTypes } from "./QuestionTypes";

const styles = StyleSheet.create({
    groupContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // border:'0px solid black',
    },
    questionContainerView: {
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        // borderStyle: 'solid'
        margin: 2,
        marginBottom: 15,
    },
    checkboxContainer: {
        width: 250,
    },
});





function getQuestionType(question) {
    if (question.max_selection_count === 1) {
        return QuestionTypes.SINGLE_CHOICE;
    }
    if (question.ordered_choices) {
        return QuestionTypes.ORDERED;
    }
    return QuestionTypes.MULTIPLE_CHOICE;
}

function getQuestionOptionComp(questionType) {
    switch (questionType) {
        case QuestionTypes.SINGLE_CHOICE:
            return KRadioButton;
        case QuestionTypes.MULTIPLE_CHOICE:
            return KCheckBox;
    }
    return () => <></>;
}

export default function Question(props) {
    const question = props.question;

    const type = getQuestionType(question);

    const QuestionOptionComp = getQuestionOptionComp(type)

    const getHandleTap = props.getGetHandleTap(question.question_id, type);

    return (
        <View key={question.question_id} style={styles.questionContainerView}>
            <Text style={styles.title}>Question {question.question_id}: </Text>

            <Text style={styles.description}>
                {question.question_description}{" "}
            </Text>

            <View style={styles.checkboxContainer}>
                <View style={QuestionOptionComp === KRadioButton ? [styles.groupContainter] : null}>
                    {question.options.map((option) => <QuestionOptionComp key={option.option_id} poption={option} getHandleTap={getHandleTap}
                        question_id={question.question_id} ballotState={props.ballotState}
                    />)}
                </View>
            </View>
        </View>);
}

//  Question;