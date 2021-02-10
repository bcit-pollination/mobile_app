import React, { Component } from "react";
import { View , Text, StyleSheet, Pressable } from "react-native";

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

// Other Customizable fields: textColor, buttonColor, onPressAction, 
// <RadioButton ITEMS={items} />

// I might have to find a better way to do coloring and allow passing as an argument
// but kinda burnt out right now, so yeah
const defaultTextColor = "black";
const defaultButtonColor = "black";

class RadioButton extends Component {
  state = {
    value: null
  };

  render() {
    const { ITEMS, onPressAction, textColor, buttonColor, borderRadius  } = this.props;
    const { value } = this.state;
    this.styles = StyleSheet.create({
      groupContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // border:'0px solid black',
      },
      singleButtonContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: buttonColor ? buttonColor : defaultButtonColor,
        // boxShadow: "2px 2px 1px #333",
        borderRadius: borderRadius ? borderRadius : 50,
        padding: 6,
        margin: 12,
        alignItems: "center",
      },
      radioText: {
        marginRight: 15,
        marginLeft: 15,
        fontSize: 20,
        color: textColor ? textColor : defaultTextColor,
        fontWeight: "700",
        // border: "0px solid black",  // for test purpose only
      },
      radioCircle: {
        // margin: 5,
        height: 30,
        width: 30,
        borderRadius: borderRadius ? borderRadius : 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: buttonColor ? buttonColor : defaultButtonColor,
        alignItems: "center",
        justifyContent: "center"
      },
      selectedRb: {
        width: 18,
        height: 18,
        borderRadius: borderRadius ? borderRadius : 50,
        borderRadius: 50,
        backgroundColor: buttonColor ? buttonColor : defaultButtonColor,
      },
      notSelectedRb: {
        width: 18,
        height: 18,
        borderRadius: 50,
        backgroundColor: "rgba(0,0,0,0.0)"
      }
    });
    
    return (
      <View style={[ this.styles.groupContainter ]}>
        {ITEMS.map((res) => {
          return (
            <Pressable 
              onPress={() => {
                this.setState({value: res.key});
                ITEMS.forEach(element => {
                  element.selected = (element.key === res.key);
                });
                console.log('Selected: ' + res.key);
                if (onPressAction) {
                  return onPressAction();
                }
              }}>
              <View key={res.key} style={[ this.styles.singleButtonContainer ]}>
                <View style={[ this.styles.radioCircle ]}>
                  {value === res.key ? <View style={[ this.styles.selectedRb ]}/> : <View style={[ this.styles.notSelectedRb ]}/> }
                </View>
                <Text style={ [this.styles.radioText ]}>{res.text}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  }
}


export default RadioButton;