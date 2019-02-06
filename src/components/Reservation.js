import React, { Component } from 'react';
import { View, Image, Picker, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { Icon } from 'react-native-elements';
import { reservationUpdate, reservationSize, reservationStart, reservationEnd } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { SwitchHome } from './common/SwitchHome';
import { connect } from 'react-redux';

class Home extends Component {
    state = {
        //location: '',
        //size: '',
        user: '',
        selectedStartDate: " ",
        selectedEndDate: " ",
        startDateTimePickerVisible: false,
        endDateTimePickerVisible: false,
        select: 'moment',
    };

    onButtonPress() {
        // const { location, size } = this.props;
        // console.log("on button press location   " + location +"  size  "+ size );
        // this.props.reservationUpdate({ location, size });
        Actions.sumreserve();
    }

    updateLocation = (location) => {
        this.setState({ location: location });
        this.props.reservationUpdate(location);
    }

    updateSize = (size) => {
        this.setState({ size: size });
        this.props.reservationSize(size);
    }
    constructor(props) {
        super(props);
        this.state = {
            switch1Value: false,
            isDateTimePickerVisible: false,
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
        var date2 = date.toString();
        var date3 = date2.substring(0, 10);
        this.setState({ selectedStartDate: date3, date3: date3 });
        this.hideStartDateTimePicker();
        this.props.reservationStart(date3);
    };

    handleEndDatePicked = (date) => {
        var date2 = date.toString();
        var date3 = date2.substring(0, 10);
        this.setState({ selectedEndDate: date3, date3: date3 });
        this.hideEndDateTimePicker();
        this.props.reservationEnd(date3);
    };

    // onStartPress = (date) => {
    //     console.log('daaaa' + date)
    //     this.props.reservationStart(date);
    // }

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
        const { isDateTimePickerVisible, selectedStartDate, selectedEndDate } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={container}>
                    <View style={picker}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='gps-fixed'
                                color='#00A6A6'
                                size={40} />
                        </View>
                        <View style={picker2}>
                            <Text style={{ fontSize: 18 }}>Location</Text>
                            <Picker
                                // value={this.props.location}
                                selectedValue={this.state.location}
                                onValueChange={this.updateLocation}>

                                <Picker.Item label="12Tower" value="12Tower" />
                                <Picker.Item label="ECC" value="ECC" />
                                <Picker.Item label="HM" value="HM" />
                            </Picker>
                        </View>

                    </View>

                    <View style={picker}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                name='compare'
                                color='#00A6A6'
                                size={40} />
                        </View>
                        <View style={picker2}>
                            <Text style={{ fontSize: 18 }}>Size</Text>
                            <Picker
                                selectedValue={this.state.size}
                                onValueChange={this.updateSize}>

                                <Picker.Item label="s" value="s" />
                                <Picker.Item label="M" value="M" />
                                <Picker.Item label="L" value="L" />
                            </Picker>
                        </View>
                    </View>

                    <View style={picker3}>
                        <SwitchHome
                            toggleSwitch1={this.toggleSwitch1}
                            switch1Value={this.state.switch1Value} />
                        <Text style={{ textAlign: 'right' }}>multiple day or single day</Text>
                    </View>
                    <View style={picker3}>
                        {!this.state.switch1Value &&
                            <View style={picker3}>

                                {/* start date */}
                                <View style={picker}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='today'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>
                                    <View style={picker2}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                                <Text style={{ fontSize: 18 }}>Start Date</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.startDateTimePickerVisible}
                                                onConfirm={this.handleStartDatePicked}
                                                onCancel={this.hideStartDateTimePicker}
                                                datePickerModeAndroid='calendar'
                                            // onPress={() => this.onStartPress(selectedStartDate)}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16 }}>{selectedStartDate}</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* end date */}
                                <View style={picker}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='today'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>
                                    <View style={picker2}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                                <Text style={{ fontSize: 18 }}>End Date</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.endDateTimePickerVisible}
                                                onConfirm={this.handleEndDatePicked}
                                                onCancel={this.hideEndDateTimePicker}
                                                datePickerModeAndroid='calendar'
                                            // onPress={() => this.onEndPress(selectedEndDate)}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16 }}>{selectedEndDate}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                        {this.state.switch1Value && <View style={picker}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='access-time'
                                    color='#00A6A6'
                                    size={40} />
                            </View>
                            <View style={picker2}>
                                <Text style={{ fontSize: 18 }}>Hour</Text>
                                <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                                    <Picker.Item label="2" value="2" />
                                    <Picker.Item label="4" value="4" />
                                </Picker>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon
                                    name='today'
                                    color='#00A6A6'
                                    size={40} />
                            </View>

                            <View style={picker2}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                        <Text style={{ fontSize: 18 }}>Start Date</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        isVisible={this.state.startDateTimePickerVisible}
                                        onConfirm={this.handleStartDatePicked}
                                        onCancel={this.hideStartDateTimePicker}
                                        datePickerModeAndroid='calendar'
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16 }}>{selectedStartDate}</Text>
                                </View>
                            </View>
                        </View>
                        }

                    </View>
                </View>
                {this.state.selectedEndDate  && this.state.selectedStartDate  && 
                <View style={buttonNext}>
                    <Button onPress={this.onButtonPress.bind(this)}> Next </Button>
                </View>
                }

            </View>


        );
    }
}

const mapStateToProps = (state) => {
    // console.log("before mapstateToProps   "+ state.reserve);
    const { location, size, selectedStartDate } = state.reserve;
    // console.log("after  "+ l2 + "  "+ s2);
    return { location, size, selectedStartDate };
};

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
        // padding: 15,
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
        backgroundColor: '#FFCD00',
        elevation: 2,
        marginHorizontal: 10,

    },
});

export default connect(mapStateToProps, { reservationUpdate, reservationEnd, reservationSize, reservationStart })(Home);
