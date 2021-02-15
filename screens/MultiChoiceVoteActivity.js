import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Snackbar, Checkbox } from 'react-native-paper'

import AppButton from '../components/AppButton';

export default function MultiChoiceVoteActivity() {

  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  
  const [choice1, setChoice1] = React.useState(false);
  const [choice2, setChoice2] = React.useState(false);

  const handleChoice = () => {
    console.log("Submit Button Pressed! ");

    // Call this if vote has failed
    // onFailure();
  }

  const onFailure = () => {
    setVisible(!visible);
  }

  const onDismissSnackBar = () => {
    setVisible(false);
  }

    return (
      <View style={[
        styles.container, 
      ]}>
        <Text>Select multiple: </Text>

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            status={choice1 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChoice1(!choice1);
            }}
            label="Item 1"
          />
          <Checkbox.Item
            status={choice2 ? 'checked' : 'unchecked'}
            onPress={() => {
              setChoice2(!choice2);
            }}
            label="Item 2"
          />
        </View>

        <AppButton text="Submit" onPress={
          () => {
            handleChoice(); 
            navigation.navigate("VoteSuccess");
          }
        }/>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration="3000"
        >
          Vote failed. Please try again.
      </Snackbar>
      </View >
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
  },
});
