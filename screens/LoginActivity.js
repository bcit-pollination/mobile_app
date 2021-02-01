import React from 'react'
import { StyleSheet, View, Text, Button, Image } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function LoginActivity({ navigation }) {
    return (
        <View style={{ flexDirection: 'column' }}>

            <View classname='logo_large'>
                <Image source={require('../assets/image/logo_pollination.jpg')}></Image>
            </View>


            <View>
                <Button style={styles.signIn} title="Sign In"
                    color="black" onPress={() => navigation.navigate('Login')} />
            </View>

            <View style={styles.register}>
                <Button title='Register' color='black' onPress={() => navigation.navigate('Register')} />
            </View>
            {/* <Button onPress={() => { console.log('onpress') }} title='Manage Elections' color='white' /> */}
        </View >
    )
}

const styles = StyleSheet.create({
    signIn: {
        // marginTop: 60
    },
    register: {
        marginTop: 25,
    },
});