/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */
import { stringToBytes } from "convert-string";

import { useNavigation } from "@react-navigation/native";

import React, {
    useState,
    useEffect,
    Fragment,
} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
    TextInput,

} from 'react-native';


import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);



const ELECTION_TYPES = {
    'Single Choice Vote': 'SingleChoiceVote',
    'Multiple Choice Vote': 'MultiChoiceVote',
    'Yes/No Vote': ''
}

// pass in a prop to notify the app which 
const App = ({ route, navigation }) => {
    const { electionType } = route.params;

    useEffect(() => {
        console.log('electionType')
        console.log(electionType)

    }, [electionType])


    // Bool, is scanning?
    const [isScanning, setIsScanning] = useState(false);

    const peripherals = new Map();
    const [list, setList] = useState([]);

    // The string you wanna send
    const [text_to_send, setTextToSend] = useState('');

    // The 
    const [peripheral_info, renderPeripheral] = useState();

    // The UUID / MAC of the connected device
    const [connected_peripheral, set_to_connected] = useState(null);





    const startScan = () => {
        if (!isScanning) {
            BleManager.scan(['13333333-3333-3333-3333-333333333337'], 3, true).then(() => {
                console.log('Scanning...');
                setIsScanning(true);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    const handleStopScan = () => {
        console.log('Scan is stopped');
        setIsScanning(false);
    }


    const handleDisconnectedPeripheral = (data) => {
        // console.log()
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);


            setList(Array.from(peripherals.values()));
        }
        console.log('Disconnected from ' + data.peripheral);
    }

    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }

    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];

                console.log('\n---------------------------------------------connected peripherals-------------------------------------------')
                console.log(`ID: ${peripheral.id}`)
                set_to_connected(peripheral.id)
                console.log(`${JSON.stringify(peripheral)}`)
                console.log('\n---------------------------------------------connected peripherals-------------------------------------------')

                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                setList(Array.from(peripherals.values()));
            }
        });
    }

    const handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
            peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
    }

    const handleRedirectionToVote = (electionType) => {

    }

    // Click on the device
    const testPeripheral = (peripheral) => {
        if (peripheral) {

            if (peripheral.connected) {
                // if the stuff is connected
                // BleManager.disconnect(peripheral.id);
                BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                    console.log('peripheralInfo', peripheralInfo.services);
                })

            } else {
                BleManager.connect(peripheral.id).then(() => {
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                        p.connected = true;
                        peripherals.set(peripheral.id, p);
                        setList(Array.from(peripherals.values()));
                    }

                    console.log('Connected to ' + peripheral.id);
                    set_to_connected(peripheral.id)

                    setTimeout(() => {

                        /* Test read current RSSI value */
                        BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
                            console.log('Retrieved peripheral services', peripheralData);

                            BleManager.readRSSI(peripheral.id).then((rssi) => {


                                var service = '13333333-3333-3333-3333-333333333337';
                                var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
                                var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

                                // var service = '13333333-3333-3333-3333-333333333337';

                                var readMultiVote = '13333333-3333-3333-3333-333333330009';

                                console.log('Retrieved actual RSSI value', rssi);
                                let p = peripherals.get(peripheral.id);
                                if (p) {
                                    p.rssi = rssi;
                                    peripherals.set(peripheral.id, p);
                                    setList(Array.from(peripherals.values()));
                                }
                            });



                        });

                        // Test using bleno's pizza example
                        // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza

                        BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                            console.log('---------------- peripheralInfo ------------------------\n');
                            console.log(peripheralInfo);
                            renderPeripheral(peripheralInfo)
                            console.log('---------------- peripheralInfo ------------------------\n');

                            var service = '13333333-3333-3333-3333-333333333337';
                            var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
                            var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

                            // var service = '13333333-3333-3333-3333-333333333337';

                            var readMultiVote = '13333333-3333-3333-3333-333333330009';

                            setTimeout(() => {
                                BleManager.startNotification(peripheral.id, service, readMultiVote).then(() => {
                                    console.log('Started notification on ' + peripheral.id);
                                    BleManager.read(
                                        peripheral.id,
                                        service,
                                        readMultiVote
                                    )
                                        .then((readData) => {
                                            // get the length of the json data sent from the first read.
                                            let json_string_len = parseInt(String.fromCharCode.apply(null, readData))
                                            let json_read_len = 0
                                            let json_string = ''

                                            // console.log("typeof: " + typeof (readData));
                                            console.log("Read: " + String.fromCharCode.apply(null, readData));
                                            console.log('json_string_len: ' + json_string_len)

                                            // while (json_read_len < json_string_len) {
                                            console.log('in while()')

                                            new Promise(async function (resolve, reject) {
                                                // This while loop and Promise is really handy in doing things like this.
                                                while (json_read_len < json_string_len) {
                                                    await BleManager.read(peripheral.id, service, readMultiVote)
                                                        .then((readData) => {
                                                            console.log("This Read: " + String.fromCharCode.apply(null, readData));

                                                            // Appends new data from each read
                                                            json_string += String.fromCharCode.apply(null, readData)
                                                            json_read_len += 20

                                                            console.log(json_read_len)
                                                        })
                                                        .catch((error) => {
                                                            console.log(json_read_len)
                                                            // Failure code
                                                            console.log(error);
                                                        });
                                                }
                                                console.log('json_string:')
                                                console.log(json_string)
                                            })

                                        })
                                        .catch((error) => {
                                            // Failure code
                                            console.log(error);
                                        });





                                }).catch((error) => {
                                    console.log('Notification error', error);
                                });
                            }, 200);
                        });



                    }, 900);
                }).catch((error) => {
                    console.log('Connection error', error);
                });
            }
        }


    }



    useEffect(() => {
        BleManager.start({ showAlert: false });

        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
        bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
        bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }

        return (() => {
            console.log('unmount');
            // bleManagerEmitter.removeEventListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            // bleManagerEmitter.removeEventListener('BleManagerStopScan', handleStopScan);
            // bleManagerEmitter.removeEventListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
            // bleManagerEmitter.removeEventListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
        })
    }, []);

    const renderItem = (item) => {
        const color = item.connected ? 'yellow' : '#fff';
        return (
            <TouchableHighlight onPress={() => testPeripheral(item)}>
                <View style={[styles.row, { backgroundColor: color }]}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: '#333333', padding: 10 }}>{item.name}</Text>
                    <Text style={{ fontSize: 10, textAlign: 'center', color: '#333333', padding: 2 }}>RSSI: {item.rssi}</Text>
                    <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
                    {item.connected &&
                        <Fragment>
                            <Button title='Press Me to See UUID info' onPress={() => {

                                console.log('hey you touched me!')
                                console.log(connected_peripheral)
                                console.log(list)

                                BleManager.getConnectedPeripherals([]).then((results) => {
                                    if (results.length == 0) {
                                        console.log('No connected peripherals')

                                        BleManager.retrieveServices(connected_peripheral).then((peripheralInfo) => {
                                            console.log('peripheralInfo', peripheralInfo.services);
                                        })
                                        // console.log()
                                    }
                                    console.log(results);
                                    for (var i = 0; i < results.length; i++) {
                                        var peripheral = results[i];
                                        peripheral.connected = true;
                                        peripherals.set(peripheral.id, peripheral);
                                        peripheral
                                        setList(Array.from(peripherals.values()));
                                    }
                                });
                            }}></Button>

                            <TextInput
                                style={[styles.textInput]}
                                value={text_to_send}
                                placeholder="input"
                                onChangeText={(text) => {
                                    setTextToSend(text)
                                }}
                            />

                            <Button title='send message' onPress={() => {

                                BleManager.connect(connected_peripheral).then((res) => {
                                    console.log('connected!!!!!!!!!!!!!!!!!!!!!!!')
                                    console.log('311 ------------  res')
                                    console.log(res)
                                    console.log('311 ------------  res')

                                    BleManager.retrieveServices(connected_peripheral).then((peripheralInfo) => {
                                        console.log('peripheralInfo', peripheralInfo.services);


                                        console.log('---------- text to send--------')
                                        console.log(`string: ${text_to_send}`);
                                        console.log(`string: ${stringToBytes(text_to_send)}`);
                                        console.log('---------- text to send --------')

                                        var service = '13333333-3333-3333-3333-333333333337';
                                        var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
                                        var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

                                        console.log('---------- write---------------------')
                                        BleManager.startNotification(connected_peripheral, service, bakeCharacteristic).then(() => {
                                            setTimeout(() => {

                                                // stringToBytes(text_to_send)

                                                // BleManager.write(connected_peripheral, service, crustCharacteristic, [0])
                                                //   .then(() => {

                                                BleManager.write(connected_peripheral, service, bakeCharacteristic, stringToBytes(text_to_send)).then(() => {
                                                    console.log(`msg sent ${stringToBytes(text_to_send)}`);
                                                })

                                                console.log('Sent?????')
                                                this.alert("message sent!");
                                                // })
                                                // .catch((err) => {
                                                //   console.log('failed to send')
                                                //   console.log(err)
                                                //   this.alert("failed to send");

                                                // });
                                            })
                                                .catch((err) => {
                                                    console.log('failed to send')
                                                    console.log(err)
                                                    this.alert("failed to send");

                                                });
                                        }, 500);
                                    })
                                })
                            }
                            }></Button>
                            {/* Disconnect button */}
                            <Button title='Disconnect!' onPress={() => {
                                console.log('---------disconnecting---------------')
                                BleManager.disconnect(connected_peripheral);
                            }} />
                        </Fragment>}
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>


                        <View style={{ margin: 10 }}>
                            <Text>Scan for "Pollination" </Text>
                            <Text>Connect by tapping the device ID</Text>
                            <Button
                                title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                                onPress={() => startScan()}
                            />
                        </View>

                        {/* <View style={{ margin: 10 }}>
                            <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected()} />
                        </View> */}

                        {(list.length == 0) &&
                            <View style={{ flex: 1, margin: 20 }}>
                                <Text style={{ textAlign: 'center' }}>No peripherals</Text>
                            </View>
                        }
                        {
                            <View style={{ margin: 20 }}>

                                <Text style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{connected_peripheral && <Text>
                                    ↓↓↓Connected to device↓↓↓:</Text>}
                                </Text>

                            </View>}

                    </View>
                </ScrollView>
                <FlatList
                    data={list}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={item => item.id}
                />


                {connected_peripheral && <Button title='Proceed to the vote!' onPress={() => {
                    console.log('---------Proceed to the next screen---------------')
                    console.log(ELECTION_TYPES[electionType])
                    console.log(electionType)
                    navigation.navigate(ELECTION_TYPES[electionType], { connected_peripheral: connected_peripheral });
                }} />}


            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
