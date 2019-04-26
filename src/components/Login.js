import React, { Component } from 'react';
import { authen } from '../actions';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Expo from "expo";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import axios from 'axios';
import { AuthSession } from 'expo';
import { Action } from 'rxjs/scheduler/Action';
import { Google } from 'expo';
import { AsyncStorage } from 'react-native';

const Google_APP_ID = '367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name: "",
            email: '',
            id: ''
        }
    }

    _storeData = async (response) => {
        try {
            await AsyncStorage.setItem('token', response.token);
            Actions.container();
        } catch ({ message }) {
            Alert.alert(
                'Login Failed',
                message,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
    };

    signIn = async () => {

        const result = await Expo.Google.logInAsync({
            androidClientId: "367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com",
            webClientId: '367051335006-ag2c12ft86pc50q7tk1am1qd7iv0nb5i.apps.googleusercontent.com',
            scopes: ["profile", "email"],
            androidStandaloneAppClientId: "367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com",
        });

        if (result.type === 'success') {
            this.props.authen(result);
            this.setState({
                signedIn: true,
                name: result.user.name,
                email: result.user.email,
                id: result.user.id,
                token: result.idToken,
            })
            try {
                await axios.post('https://lockerce54.azurewebsites.net/mobile/usersauthenticate', {
                    "_Token": this.state.token,
                }).then(response => {

                    console.log("mobile/usersauthenticate", response.data.token)
                    { this._storeData(response.data) }
                    Actions.container();
                })


            }
            catch (e) {
                Alert.alert(
                    'Login Failed',
                    e.response.data.message,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }
        }

        else {
            Actions.authen();
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ paddingBottom: 50 }} >
                    <Image
                        style={{ width: 217.5, height: 298 }}
                        source={require('/frontend/src/components/image/dog1.png')}
                    />
                </View>
                {/* <Button
                    buttonStyle={{ backgroundColor: "#4285F4", borderRadius: 15 }}
                    onPress={() => this.signIn()}
                    leftIcon={{ name: 'google' }}
                    title="Sign in with Google KMITL accout" /> */}
                <SocialIcon
                    style={{ backgroundColor: "#DB4437", borderRadius: 15, padding: 10 }}
                    onPress={() => this.signIn()}
                    title='Sign In With KMITL Google Account'
                    button
                    raised={false}
                    type='google'
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#404244",
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
    },
    header: {
        fontSize: 25,
        color: '#fff'
    },
})
export default connect(null, { authen })(Login);
