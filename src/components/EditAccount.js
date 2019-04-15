import React, { Component } from 'react';
import { Text, View, Image, TextInput, Alert } from 'react-native';
import { Button } from './common/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { authen } from '../actions';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

class EditAccount extends Component {
    state = { reserve: [] }
    componentWillMount= async () => {
        // var newId = this.props.result.user.email.toString();
        // var newId_accout = newId.substring(0, newId.length - 12);
        const value = await AsyncStorage.getItem('token');
        await axios.get(`https://locker54.azurewebsites.net/mobile/Getphone?id_account=${this.props.result.id_account}`,
        { headers: { "Authorization": `Bearer ${value}` } })
            .then(response => this.setState({ reserve: response.data }));
    }

    constructor(props) {
        super(props);
        this.state = { text: undefined };
    }

    onSavePress = async (phoneNum) => {
        console.log("onSavePress ", phoneNum)
        const valueToken = await AsyncStorage.getItem('token');
        axios.post('https://locker54.azurewebsites.net/mobile/AddPhoneNumber', {            
                "id_account": this.props.result.id_account,
                "phone": phoneNum              
        },
            { headers: { "Authorization": `Bearer ${valueToken}` } }
        )
            .then(res => {
                console.log('ress ' + res);
                console.log('res dataa  ' + res.data);
                if (res.status == 200) {
                    Alert.alert(
                        'Chagng number success',
                        'Press ok to go back',
                        [
                            { text: 'OK'},
                        ],
                        { cancelable: false },
                    );
                }

            })
            .catch(error => {
                    Alert.alert(
                        'Change number failed',
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
                        <Text style={headerTextStyle}>Phone Number</Text>
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

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen })(EditAccount);
