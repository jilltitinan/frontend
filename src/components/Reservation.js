import React, { Component } from 'react';
import { View, Image, Picker, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { SwitchHome } from './common/SwitchHome';

class Home extends Component {
    state = { 
        user: '',
        selectedDate: " ",
        startDateTimePickerVisible: false,
        endDateTimePickerVisible: false,
        select: 'moment',
     };

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
   

    showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });
    
    hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
    
    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });
    
    handleStartDatePicked = (date) => {
      console.log('A start date has been picked: ', date);
      this.hideStartDateTimePicker();
    };
    
    handleEndDatePicked = (date) => {
      this.setState({ selectedDate: date.toString()});
      this.hideEndDateTimePicker();
    };

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
        const { container, picker, text, picker2, picker3, buttonNext } = styles;
        const { isDateTimePickerVisible, selectedDate } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={container}>
                    <View style={picker}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='home'
                                color='#00aced'
                                size={40} />
                        </View>
                        <View style={picker2}>
                            <Text style={{ fontSize: 18 }}>Location</Text>
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
                            <Text style={{ fontSize: 18 }}>Size</Text>
                            <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                <Picker.Item label="Steve" value="steve" />
                            </Picker>
                        </View>
                    </View>

                    <View style={picker3}>
                        <SwitchHome
                            toggleSwitch1={this.toggleSwitch1}
                            switch1Value={this.state.switch1Value} />
                        <Text>Multiple day or only one day</Text>
                    </View>
                    <View style={picker3}>
                        {!this.state.switch1Value &&
                            <View style={picker3}    >
                                <View style={picker}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='home'
                                            color='#00aced'
                                            size={40} />
                                    </View>
                                    <View style={picker2}>
                                        <Text style={{ fontSize: 18 }}>Start Date</Text>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                                <Text>is{selectedDate}</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.startDateTimePickerVisible}
                                                onConfirm={this.handleStartDatePicked}
                                                onCancel={this.hideStartDateTimePicker}
                                            />
                                        </View>
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
                                        <Text style={{ fontSize: 18 }}>End Date</Text>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                                <Text>endd Calendarrr</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.endDateTimePickerVisible}
                                                onConfirm={this.handleEndDatePicked}
                                                onCancel={this.hideEndDateTimePicker}
                                            />
                                        </View>
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
                                <Text style={{ fontSize: 18 }}>Size</Text>
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
                                <Text style={{ fontSize: 18 }}>One day</Text>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={this._showDateTimePicker}>
                                        <Text>Calendarrr</Text>
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
        flex: 1,
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
