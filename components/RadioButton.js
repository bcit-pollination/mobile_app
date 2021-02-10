import React, { Component } from "react";
import { View, TouchableWithoutFeedback , Text, StyleSheet } from "react-native";

// Instruction:
// 1. Import
// import RadioButton from '../components/RadioButton';

// 2. Define ITEMS array with key and text, example:
// const items = [
// 	{ key: 'Pizza',
// 		text: 'Pizza',
// 	},
// 	{ key: 'Lasagna',
// 		text: 'Lasagna',
// 	},
// 	{ key: 'Gnocchi',
// 		text: 'Gnocchi',
//   },
// ];

// 3. Call 
// <RadioButton ITEMS={items} />

// I might have to find a better way to do coloring and allow passing as an argument
// but kinda burnt out right now, so yeah
const textColor = "black";
const buttonColor = "black";

class RadioButton extends Component {
  state = {
    value: null
  };

  render() {
    const { ITEMS } = this.props;
    const { value } = this.state;
    return (
      <View style={styles.groupContainter}>
        {ITEMS.map((res) => {
          return (
            <TouchableWithoutFeedback 
              onPress={() => {
                this.setState({ value: res.key });
                console.log('Selected: ' + res.key);
              }}>
              <View key={res.key} style={styles.singleButtonContainer}>
                <View style={styles.radioCircle}>
                  {value === res.key ? <View style={styles.selectedRb}/> : <View style={styles.notSelectedRb}/> }
                </View>
                <Text style={styles.radioText}>{res.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
}

// StyleSheet just for these radio buttons
const styles = StyleSheet.create({
  groupContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    // border:'0px solid black',
  },
  singleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    // border: "2px solid " + buttonColor,
    // boxShadow: "2px 2px 1px #333",
    borderRadius: 50,
    padding: 6,
    margin: 12,
    alignItems: "center",
    // cursor:'pointer',
  },
  radioText: {
    // userSelect: "none",
    marginRight: 15,
    marginLeft: 15,
    fontSize: 20,
    color: textColor,
    fontWeight: "700",
    // border: "0px solid black",  // for test purpose only
  },
  radioCircle: {
    // margin: 5,
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    // border: "2px solid " + buttonColor,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedRb: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: buttonColor,
  },
  notSelectedRb: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.0)"
  }
});

export default RadioButton;
