import React, { Component } from 'react';
import { View, Image, Picker, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { SwitchHome } from './common/Switch';

class Home extends Component {
    state = { user: '' }
    updateUser = (user) => {
        this.setState({ user: user })
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
    state = {
        isDateTimePickerVisible: false,
        select: 'moment',
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({ select: date });
        console.log('A date has been picked: ', this.state.select);
        this._hideDateTimePicker();
    };

    render() {
        const { container, picker, text, picker2, picker3, buttonNext } = styles;
        return (
            <View style={{ flex: 1}}>
                <View style={container}>
                    <View style={picker}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='home'
                                color='#00aced'
                                size={40} />
                        </View>
                        <View style={picker2}>
                            <Text>Location</Text>
                            <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                <Picker.Item label="Steve" value="steve" />                                
                            </Picker>
                        </View>

                    </View>

                    <View style={picker}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='home'
                                color='#00aced'
                                size={40} />
                        </View>
                        <View style={picker2}>
                            <Text>Size</Text>
                            <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                <Picker.Item label="Steve" value="steve" />                                
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='home'
                                color='#00aced'
                                size={40} />
                        </View>
                        <View style={picker2}>
                            <Text>Amount</Text>
                            <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                <Picker.Item label="Steve" value="steve" />
                                
                            </Picker>
                        </View>
                    </View>

                    <View style={picker3}>
                        <SwitchHome
                            toggleSwitch1={this.toggleSwitch1}
                            switch1Value={this.state.switch1Value} />
                        <Text>Hellloooo</Text>
                    </View>
                    <View style={picker3}>
                        {!this.state.switch1Value &&
                            <View style={picker}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name='home'
                                        color='#00aced'
                                        size={40} />
                                </View>
                                <View style={picker2}>
                                    <Text>Size</Text>
                                    <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                        <Picker.Item label="Steve" value="steve" />                                        
                                    </Picker>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name='home'
                                        color='#00aced'
                                        size={40} />
                                </View>
                                <View style={picker2}>
                                    <Text>More than one day</Text>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={this._showDateTimePicker}>
                                            <Text>kuy idiot jill</Text>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this._handleDatePicked}
                                            onCancel={this._hideDateTimePicker}
                                        />
                                    </View>

                                </View>
                            </View>

                        }
                        {this.state.switch1Value && <View style={picker}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name='home'
                                        color='#00aced'
                                        size={40} />
                                </View>
                                <View style={picker2}>
                                    <Text>Size</Text>
                                    <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                        <Picker.Item label="Steve" value="steve" />                                        
                                    </Picker>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon
                                        name='home'
                                        color='#00aced'
                                        size={40} />
                                </View>
                                <View style={picker2}>
                                    <Text>One day</Text>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={this._showDateTimePicker}>
                                            <Text>kuy idiot jill</Text>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this._handleDatePicked}
                                            onCancel={this._hideDateTimePicker}
                                        />
                                    </View>

                                </View>
                            </View>
                        }

                    </View>
                </View>
                <View style={buttonNext}>
                    <Button> Next </Button>
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginHorizontal: 10,
        marginTop: 10,

    },   
    picker: {
        backgroundColor: '#FFFFFF',
        // flex: 1,
        // justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    picker2: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    picker3: {
        // flex: 1,
        justifyContent: 'space-between',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginHorizontal: 10,
    },
    
});

export default Home;
