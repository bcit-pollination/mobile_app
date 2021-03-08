import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

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

const RadioButton = ({
  options,
  onPressAction,
  textColor,
  buttonColor,
  borderRadius,
}) => {
  const localOptions = options.map((curOption) => {
    // holds the option object with the new isChecked prop
    const modifiedOption = curOption;
    // define isChecked prop
    modifiedOption.isChecked = false;
    // return the now modified object
    return modifiedOption;
  });

  console.log(localOptions);

  const [checkedItems, setCheckedItems] = useState(localOptions);

  // handles change to the checkedItems array whenever an option is pressed
  const handleChange = (index) => {
    console.log("pressed");
    console.log("index " + parseInt(index));

    // holds the modified checkedItems array
    let items = [...checkedItems];

    console.log(items[index]);

    // holds the modified option object
    let item = { ...items[index] };
    console.log(item.isChecked);

    // change isChecked value
    item.isChecked = !item.isChecked;

    // update array
    items[index] = item;

    // unselect other items
    for (let i = 0; i < items.length; i++) {
      // holds updated option object
      let loopItem = { ...items[i] };
      // if option is not the selected option and is checked true
      if (i != index && loopItem.isChecked === true) {
        // uncheck option
        loopItem.isChecked = !loopItem.isChecked;
        // update array
        items[i] = loopItem;
      }
    }

    console.log("checkedItems:");
    console.log(checkedItems);

    setCheckedItems(items);
  };

  const renderSelection = (index) => {
    // visual render for a selected option
    let selected = (
      <View style={[styles.selectedRb, customStyles.selectedRb]} />
    );

    // visual render for a non-selected option
    let notSelected = <View style={[styles.notSelectedRb]} />;

    return checkedItems[index].isChecked ? selected : notSelected;
  };

  // dynamically renders the options for a question
  const renderOptions = (options) => {
    let arr = [];

    arr = options.map((curOption, index) => {
      return (
        <Pressable
          key={index}
          onPress={() => {
            handleChange(index);
          }}
        >
          <View
            style={[
              styles.singleButtonContainer,
              customStyles.singleButtonContainer,
            ]}
          >
            <View style={[styles.radioCircle, customStyles.radioCircle]}>
              {/* renders the visual aspect of radio selection */}
              {renderSelection(index)}
            </View>
            {/* Renders the option text */}
            <Text style={[styles.radioText]}>{curOption.description}</Text>
          </View>
        </Pressable>
      );
    });

    return arr;
  };

  // customizable styles as per the props passed in
  const customStyles = StyleSheet.create({
    singleButtonContainer: {
      borderColor: buttonColor ? buttonColor : defaultButtonColor,
      // boxShadow: "2px 2px 1px #333",
      borderRadius: borderRadius ? borderRadius : 50,
    },
    radioText: {
      color: textColor ? textColor : defaultTextColor,
    },
    radioCircle: {
      borderRadius: borderRadius ? borderRadius : 50,
      borderColor: buttonColor ? buttonColor : defaultButtonColor,
    },
    selectedRb: {
      borderRadius: borderRadius ? borderRadius : 50,
      backgroundColor: buttonColor ? buttonColor : defaultButtonColor,
    },
  });

  return (
    <View style={[styles.groupContainter]}>
      {renderOptions(options)}
    </View>
  );
};

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

export default RadioButton;
