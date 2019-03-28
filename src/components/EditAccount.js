import React, { Component } from 'react';
import { Text, View, Image, TextInput, Alert } from 'react-native';
import { Button } from './common/Button';
import axios from 'axios';

class EditAccount extends Component {
    state = { reserve: [] }
    componentWillMount() {
        axios.get('https://locker54.azurewebsites.net/mobile/Getphone?id_account=58010326')
            .then(response => this.setState({ reserve: response.data }));
    }

    constructor(props) {
        super(props);
        this.state = { text: undefined };
    }
    onSavePress(phoneNum) {
        console.log("onSavePress ", phoneNum)
        
        axios.put(`https://locker54.azurewebsites.net/mobile/AddPhoneNumber?id=58010326&phone=${phoneNum}`)
            .then(res => {
                console.log('ress ' + res);
                console.log('res dataa  ' + res.data);
                if (res.status == 200) {
                    Alert.alert(
                        'Reservation Success',
                        'press ok to go back',
                        [
                            { text: 'OK'},
                        ],
                        { cancelable: false },
                    );
                }

            })
            .catch(error => {
                console.log('error reserve response ' + error.response);
                console.log('error reserve data ' + error.response.data);
                
                    Alert.alert(
                        'Reservation Failed',
                        error.response.data,
                        [
                            { text: 'OK', onPress: () => Actions.Reserve() },
                        ],
                        { cancelable: false },
                    );
            })
    }

    render() {

        const {
            headerContentStyle,
            headerTextStyle,
            buttonNext,
            containerStyle,
            bottom,
        } = styles;

        return (
            <View
                style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}
            >
                <View style={containerStyle}>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>Phone Number + {this.state.reserve}</Text>
                        {this.state.reserve != undefined &&
                            <TextInput
                                style={{ height: 40, }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                                defaultValue={`${this.state.reserve}`}
                                keyboardType='numeric'
                            />
                        }
                        {this.state.reserve == undefined &&
                            <TextInput
                                style={{ height: 40, }}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.reserve}
                                keyboardType='numeric'
                            />
                        }

                    </View>
                </View>
                <View style={bottom}>
                    <Button style={buttonNext} onPress={() => this.onSavePress(this.state.text)}> Save </Button>
                </View>
            </View>
        );
    };

};

const styles = {
    headerContentStyle: {
        justifyContent: 'space-around',
    },
    headerTextStyle: {

        fontSize: 18,
        fontWeight: 'bold',
        color: '#6C6B6B',
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#3C6E71',
        backgroundColor: '#3C6E71',
        marginHorizontal: 10,
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    }

};

export default EditAccount;
