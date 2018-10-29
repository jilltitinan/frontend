import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements'


class Login extends Component {
    render() {
        return (
            <View style={
                {
                    borderTopLeftRadius: 150,
                    borderTopRightRadius: 150,
                    position: 'relative',
                    zIndex: 2,
                    marginTop: 400
                }
            }>
                <SocialIcon
                    title='Login with Google+'
                    button
                    type='google-plus-official'
                    onPress={Actions.container}
                />
            </View>


        );
    }
}


export default Login;
