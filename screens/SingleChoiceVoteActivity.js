import React from 'react'
import { StyleSheet, View, Text, ToastAndroid, Platform, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import RadioButton from '../components/RadioButton';
import AppButton from '../components/AppButton';

function showFail(text) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(text, ToastAndroid.SHORT)
  } else {
    Alert.alert(text);
  }
}

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
  showFail("Vote failed. Please try again.");
}

export default function SingleChoiceVoteActivity() {
  const navigation = useNavigation();
    return (
      <View style={[
        styles.container, 
      ]}>
        <Text>Select only 1: </Text>
        <RadioButton ITEMS={items} textColor='black' buttonColor='rgb(0,0,100)'/>
        <AppButton text="Submit" onPress={() => {handleChoice(items); navigation.navigate("VoteSuccess");}}/>
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
