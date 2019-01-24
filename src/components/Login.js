import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements'

class Login extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 2}}>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require('/frontend/src/components/image/dog1.jpg')}
                    />
                </View>

                <View style={
                    {      
                        flex: 1
                    }
                }>
                    <SocialIcon
                        title='Login with Google+'
                        button
                        type='google-plus-official'
                        onPress={Actions.container}
                    />
                </View>

            </View>


        );
    }
}


export default Login;
