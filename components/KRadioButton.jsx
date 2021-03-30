import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import RadioButton from "./RadioButton";


function KRadioButton(props) {
    const option = props.poption;
    const textColor= "black";
    const buttonColor= "rgb(0,0,100)"
    const question_id = props.question_id;
    const handleTap = props.getHandleTap(option.option_id)(0);
    const selected = props.ballotState[question_id][option.option_id] === -1;

    const customStyles = StyleSheet.create({
        singleButtonContainer: {
            borderColor: buttonColor,
            // boxShadow: "2px 2px 1px #333",
            borderRadius:  50,
        },
        radioText: {
            color: textColor
        },
        radioCircle: {
            borderRadius:  50,
            borderColor: buttonColor
        },
        selectedRb: {
            borderRadius:  50,
            backgroundColor: buttonColor
        },
    });

    return (
        <Pressable
            key={option.option_id}
            onPress={handleTap}
        >
            <View
                style={[
                    styles.singleButtonContainer,
                    customStyles.singleButtonContainer,
                ]}
            >
                <View style={[styles.radioCircle, customStyles.radioCircle]}>
                    {/* renders the visual aspect of radio selection */}
                    <View style={ selected ? [styles.selectedRb, customStyles.selectedRb] : [styles.notSelectedRb]} />
                </View>
                {/* Renders the option text */}
                <Text style={[styles.radioText]}>{option.option_description}</Text>
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    groupContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // border:'0px solid black',
    },
    singleButtonContainer: {
        flexDirection: "row",
        borderWidth: 2,
        padding: 6,
        margin: 12,
        alignItems: "center",
    },
    radioText: {
        marginRight: 15,
        marginLeft: 15,
        fontSize: 20,

        fontWeight: "700",
        // border: "0px solid black",  // for test purpose only
    },
    radioCircle: {
        // margin: 5,
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    selectedRb: {
        width: 18,
        height: 18,
        borderRadius: 50,
    },
    notSelectedRb: {
        width: 18,
        height: 18,
        borderRadius: 50,
        backgroundColor: "rgba(0,0,0,0.0)",
    },
});


export default KRadioButton;