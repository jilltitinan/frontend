import React, { Component } from 'react';
import { authen } from '../actions';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import Expo from "expo";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import axios from 'axios';
import { AuthSession } from 'expo';
import { Action } from 'rxjs/scheduler/Action';
import { AsyncStorage } from 'react-native';



class Waiting extends Component {

    render() {
        return (
            <View style={styles.container}>

                <LoginPage signIn={this.signIn} />

            </View>
        )
    }
}

const LoginPage = props => {
    return (

        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <View >
                <Image
                    style={{ width: 217.5, height: 298 }}
                    source={require('/frontend/src/components/image/dog1.png')}
                />
            </View>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
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
export default Waiting;

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