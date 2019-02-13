import React, { Component } from 'react';
import { authen } from '../actions';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Expo from "expo";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import axios from 'axios';

class Login extends Component {
    //     render() {
    //         return (
    //             <View style={{flex: 1}}>
    //                 <View style={{flex: 2}}>
    //                     <Image
    //                         style={{ width: 200, height: 200 }}
    //                         source={require('/frontend/src/components/image/dog1.jpg')}
    //                     />
    //                 </View>

    //                 <View style={
    //                     {      
    //                         flex: 1
    //                     }
    //                 }>
    //                     <SocialIcon
    //                         title='Login with Google+'
    //                         button
    //                         type='google-plus-official'
    //                         onPress={Actions.container}
    //                     />
    //                 </View>

    //             </View>


    //         );
    //     }
    // }

    constructor(props) {
        super(props)
        this.state = {
            signedIn: false,
            name:"",
            email: '',
            id:''
        }
    }
    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId:
                    "367051335006-v73qu683beioaonp7k4b9ote57hfqspe.apps.googleusercontent.com",
                //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
                scopes: ["profile", "email"]
            })
            console.log(result);
            this.props.authen(result);

            this.setState({
                signedIn: true,
                name: result.user.name,
                email: result.user.email,
                id: result.user.id,
            })

            if (result.type === "success") {
                axios.post('https://locker54.azurewebsites.net/api/Account/AddUserAccount', {
                    "id_account": this.state.id,
                    "name": this.state.name,
                    "phone": " ",
                    "email": this.state.email,
                    "role": " ",
                    "point": 0
                })
              
            } else {
                console.log("cancelled")
            }
        } catch (e) {
            console.log("error", e)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.signedIn ? (
                    <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
                ) : (
                        <LoginPage signIn={this.signIn} />
                    )}
            </View>
        )
    }
}

const LoginPage = props => {
    return (
        <View>
            <Text style={styles.header}>Sign In With Google</Text>
            <Button title="Sign in with Google" onPress={() => props.signIn()} />
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontSize: 25
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