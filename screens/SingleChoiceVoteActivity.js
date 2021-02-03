import React from 'react'
import { StyleSheet, View, Text, Button, Image, Linking } from 'react-native'
import { color } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RadioButton from '../components/RadioButton';
import GlobalStyles from "../constants/GlobalStyles";
import AppLogo from '../components/AppLogo';

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

export default function SingleChoiceVoteActivity({ navigation }) {
    return (
      <View style={[
        styles.container, 
        GlobalStyles.yellowBackground,
      ]}>
        {/* <AppLogo /> */}
        <Text>Select only 1: </Text>
        <RadioButton ITEMS={items} textColor='black' buttonColor='rgb(0,0,100)' borderRadius='50px'/>
        <Button color="rgba(0,0,0,0.8)" title="Submit" onPress={() => handleChoice(items)}/>
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
