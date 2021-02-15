import React from 'react'
import { StyleSheet, View, Text, ToastAndroid, Platform, Alert } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Snackbar } from 'react-native-paper'
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

export default function MultiChoiceVoteActivity() {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

    const handleChoice = (items) => {
      console.log("Submit Button Pressed! ");
      console.log(items);
      items.forEach(element => {
        element.selected ? console.log("Submitting option: ", element.text):null;
      });

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
        <RadioButton ITEMS={items} textColor='black' buttonColor='rgb(0,0,100)'/>
        <AppButton text="Submit" onPress={
          () => {
            handleChoice(items); 
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});
