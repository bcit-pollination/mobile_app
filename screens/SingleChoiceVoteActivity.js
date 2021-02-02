import React from 'react'
import { StyleSheet, View, Text, Button, Image, Linking } from 'react-native'
import { color } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const data = [
  {
    label: 'Choice 1'
  }, 
  {
    label: 'Choice 2'
  },
  {
    label: 'Choice 3'
  },
  {
    label: 'Choice 4'
  },
];
  
const handleChoice = event => {
  console.log(event);
}

export default function SingleChoiceVoteActivity({ navigation }) {

    return (
        <View style={styles.container}>
          <Text>Select only 1: </Text>

          <Button title="Submit"/>
        </View >
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    margin: 20,
  },
  radio: {
    margin: 15,
  },
  radioBox: {
    borderRadius: 20,
  }
});
