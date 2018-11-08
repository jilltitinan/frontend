import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { HomeButton } from './common/HomeButton';
import { Icon } from 'react-native-elements';

class Home extends Component {
    render() {
        const { container, button } = styles;
        return (
            <View style={container}>
                <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                    style={{ width: 200, height: 200 }} />

                <View style={button}>
                    <View>
                        
                        <HomeButton onPress={Actions.Reserve}>
                            Reservation
                    </HomeButton>
                    </View>
                    <View>
                        

                        <HomeButton onPress={Actions.Reserve}>
                            Promotion
                    </HomeButton>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 10,

    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    }
}

export default Home;
