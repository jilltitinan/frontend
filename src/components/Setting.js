import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { SwitchHome } from './common/SwitchHome';

class Setting extends Component {
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

    constructor() {
        super();
        this.state = {
            switch1Value: false,
        }
    }

    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
        console.log('Switch 1 is: ' + value)
    }

    render() {
        const { container, box } = styles;
        return (
            <View style={{ flex: 1 }}>
                <View style={container}>
                    <View style={box}>
                        <Text>Notification</Text>
                        <SwitchHome
                            toggleSwitch1={this.toggleSwitch1}
                            switch1Value={this.state.switch1Value} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 10,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },



}

export default Setting;