import React, { Component } from 'react';
import { authen } from '../actions';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button } from './common/Button';
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
        console.log('add account : ', response.token)
        try {
            await AsyncStorage.setItem('token', response.token);
            // Actions.container();
        } catch ({message}) {
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
        try {
            // const result = await Google.logInAsync({
            //     androidClientId:
            //         "367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com",
            //     //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
            //     scopes: ["profile", "email"]
            // })

            // console.log(result);

            const result = await Google.logInAsync({
                androidClientId:
                    "367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com",
                androidStandaloneAppClientId: "367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com",
            });

            // console.log(type, accessToken, user)
            // Alert.alert(
            //     'Login Start', [{ text: 'OK', onPress: () => console.log('OK Pressed') },],
            //     { cancelable: false },
            // );

            if (result.type === 'success') {
                // Alert.alert(
                //     'Login success', [{ text: 'OK', onPress: () => console.log('OK Pressed') },],
                //     { cancelable: false },
                // );
                this.props.authen(result);

                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    email: result.user.email,
                    id: result.user.id,
                    token: result.idToken,
                })

                if (result.type === "success") {
                    const response = await axios.post('https://lockerce54.azurewebsites.net/mobile/usersauthenticate', {
                        "_Token": this.state.token,
                    });

                    { this._storeData(response.data) }
                    Actions.container();
                } else {
                    console.log("cancelled")
                }
            }
        }
        catch ({message}) {
            // console.log(message);
            Actions.container();
            console.log("error  accounxt ", message)
            if (message == 'account_already_exist') {
                Actions.container();
            }
            else {
                Alert.alert(
                    'Login Failed',
                    message,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }

        }

    }

    render() {
        return (
            <View style={styles.container}>


                <View style={{ flex: 1, marginTop: 100, }}>
                    <View >
                        <Image
                            style={{ width: 217.5, height: 298 }}
                            source={require('/frontend/src/components/image/dog1.png')}
                        />
                    </View>
                    <Text style={styles.header}>Welcome to Locker</Text>
                    <Button onPress={() => this.signIn()}>Sign In with google</Button>
                </View>


            </View>
        )
    }
}

const LoginPage = props => {
    return (

        <View style={{ flex: 1, marginTop: 100, }}>
            <View >
                <Image
                    style={{ width: 217.5, height: 298 }}
                    source={require('/frontend/src/components/image/dog1.png')}
                />
            </View>
            <Text style={styles.header}>Welcome to Locker</Text>
            <Button onPress={() => this.signIn()}>Sign In with google</Button>
        </View>

    )
}

const LoggedInPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome:{props.name}</Text>
            <Image style={styles.image} source={{ uri: props.photoUrl }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#404244",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25,
        color: '#fff'
    },
    image: {
        marginTop: 15,
        width: 150,
        height: 150,
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 3,
        borderRadius: 150
    }
})
export default connect(null, { authen })(Login);

// "refreshToken": "1/vMzkQEyucCqDKeRWkBdJaqhndOLxxNnn1OytqBx2Xj8Sr1nzGF9X5Ka8vdbIzMGq",
//  "serverAuthCode": "4/6gCF1bmHmolwAuMDI18TBOKaxduLKv27huQM1eS1gZ23jFGF68ckiNw6-agN8IxIxtswjZ8L7o89ad85rKraMXo",
//  "type": "success",
//  "user": Object {
//     "email": "jilltitinan@gmail.com",
//     "familyName": "Titinan",
//     "givenName": "Jill",
//     "id": "111754653601874456461",
//     "name": "Jill Titinan",
//     "photoUrl": "https://lh5.googleusercontent.com/-Sx4YVPCUCbI/AAAAAAAAAAI/AAAAAAAAABM/U4C_hz6mefs/photo.jpg",
//   },
//  }