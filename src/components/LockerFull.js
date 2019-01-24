import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';

class LockerFull extends Component {
    componentWillMount() {
        const { width } = Dimensions.get('window');

        // Responsive Condition
        if (width > 375) {
            this.setState({
                ...this.state,
                size: 24,
            });
        } else if (width > 320) {
            this.setState({
                ...this.state,
                size: 24,
            });
        } else {
            this.setState({
                ...this.state,
            });
        }
    }

    render() {
        return(
            <View>
                
            </View>
        )
    }
}