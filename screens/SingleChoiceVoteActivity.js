import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import RadioButton from '../components/RadioButton';
import AppButton from '../components/AppButton';

const items = [
  { key: 'Pizza',
    text: 'Pizza',
    selected: false,
  },
  { key: 'Lasagna',
    text: 'Lasagna',
    selected: false,
  },
  { key: 'Gnocchi',
    text: 'Gnocchi',
    selected: false,
  },
];

const handleChoice = (items) => {
  console.log("Submit Button Pressed! ");
  console.log(items);
  items.forEach(element => {
    element.selected ? console.log("Submitting option: ", element.text):null;
  });
}

export default function SingleChoiceVoteActivity() {
    return (
      <View style={[
        styles.container, 
      ]}>
        <Text>Select only 1: </Text>
        <RadioButton ITEMS={items} textColor='black' buttonColor='rgb(0,0,100)'/>
        <AppButton text="Submit" onPress={() => handleChoice(items)}/>
      </View >
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
