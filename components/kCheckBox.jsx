import React from 'react';
import {StyleSheet} from "react-native";
import {Checkbox} from "react-native-paper";

function KCheckBox(props) {
    const option = props.poption;
    const handleTap = props.getHandleTap(option.option_id)(0);
    const question_id = props.question_id;
    const selected = props.ballotState[question_id][option.option_id] === -1;

    return (
        <Checkbox.Item
            key={index}
            style={styles.item}
            status={selected ? "checked" : "unchecked"}
            onPress={handleTap}
            color="#000"
            label={option.option_description}
        />
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


export default KCheckBox;