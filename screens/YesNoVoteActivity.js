import React from 'react'
import { StyleSheet, View, Text, Button, Image, Linking } from 'react-native'
import { color } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RadioButton from '../components/RadioButton';
import GlobalStyles from "../constants/GlobalStyles";
import AppLogo from '../components/AppLogo';

const items = [
  { key: 'Yes',
    text: 'Yes',
  },
  { key: 'No',
    text: 'No',
  }
];

const handleChoice = event => {
  console.log("Submit Button");
}

export default function YesNoVoteActivity({ navigation }) {

    return (
      <View style={[
        styles.container, 
        GlobalStyles.yellowBackground,
      ]}>
        {/* <AppLogo /> */}
        <Text style={[
        styles.question
        ]}>
            Are you experienced with C+++: 
        </Text>
        <RadioButton ITEMS={items} />
        <Text style={[
        styles.question
        ]}>
            Are you experienced with C++: 
        </Text>
        <RadioButton ITEMS={items} />
        <Text style={[
        styles.question
        ]}>
            Are you experienced with Python: 
        </Text>
        <RadioButton ITEMS={items} />
        <Button color="rgba(0,0,0,0.8)" title="Submit" onPress={handleChoice}/>
      </View >
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    marginTop:30,
    fontSize: 20,
  }
});
