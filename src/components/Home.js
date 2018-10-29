import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';

class Home extends Component {
    render() {
        const { container, button } = styles;
        return (
            <View style={container}>
                <View style={button}>
                    <Button onPress={Actions.Reserve}>
                        Reservation
                    </Button>                
                    <Button  onPress={Actions.Reserve}>
                        Reservation 2
                    </Button>
                </View>


            </View>

        );
    }
}

const styles = {
    container: {
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 10
    },
    button: {
        flexDirection: 'row',
    }
}

export default Home;
