import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AppButton from '../components/AppButton';

export default function SingleChoiceVoteActivity() {
  const navigation = useNavigation();
  return (
    <View style={[
      styles.container, 
    ]}>
      <Text>Your vote has been submitted.{"\n\n"}Thank you for participating. </Text>
      <AppButton text="Return to Home" onPress={() => navigation.navigate("Home")}/>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column'
  }
});
