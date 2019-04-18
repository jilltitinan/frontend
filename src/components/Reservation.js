import React, { Component } from 'react';
import { View, Image, Picker, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from './common/DatePicker';
import { Icon } from 'react-native-elements';
import { reservationUpdate, reservationSize, reservationStart, reservationEnd, reservationHour, reservationStartTime, reservationType } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { SwitchHome } from './common/SwitchHome';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import moment from 'moment';

var today = new Date();
var nextDay = new Date();
const item1 = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20'];
const item2 = ['2', '4', '6', '8', '10', '12', '14', '16', '18'];
const item3 = ['2', '4', '6', '8', '10', '12', '14', '16'];
const item4 = ['2', '4', '6', '8', '10', '12', '14'];
const item5 = ['2', '4', '6', '8', '10', '12'];
const item6 = ['2', '4', '6', '8', '10'];
const item7 = ['2', '4', '6', '8'];
const item8 = ['2', '4', '6'];
const item9 = ['2', '4'];
const item10 = ['2',];
const item11 = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'];
const item12 = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'];
var BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel',];
class Home extends Component {

    state = {
        user: '',
        selectedStartDate: " ",
        selectedEndDate: " ",
        startDateTimePickerVisible: false,
        endDateTimePickerVisible: false,
        select: 'moment',
    };

    onButtonPress() {
        Actions.sumreserve();
    }

    updateLocation = (location) => {
        this.setState({ location: location });
        this.props.reservationUpdate(location);
    }

    updateHour = (hour) => {
        this.setState({ hour: hour });
        this.props.reservationHour(hour);
    }

    updateTime = (time) => {
        this.setState({ time: time });
        this.props.reservationStartTime(time);
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
            selected1: '',
        }
    }

    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value });
        this.props.reservationType(value.toString());
    }

    showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });
    showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });
    hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });
    hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

    showTimePicker = () => this.setState({ TimePickerVisible: true });
    hideShowTimePicker = () => this.setState({ TimePickerVisible: false });

    handleStartDatePicked = (date) => {
        var dateRedux = date.toString();
        var weekDayName = moment(date).format('dddd');
        var date3 = moment(date).format('DD-MM-YYYY');
        this.setState({ selectedStartDate: weekDayName + ' ' + date3, dateRedux: date3 });
        this.hideStartDateTimePicker();
        this.props.reservationStart(dateRedux);
        nextDay = date;
        nextDay.setDate(nextDay.getDate() + 1);
    };

    handleEndDatePicked = (date) => {
        // var date5 = date.toString();
        // var enddateDay = date5.substring(0, 10);
        var dateRedux = date.toString();
        var weekDayName = moment(date).format('dddd');
        var date4 = moment(date).format('DD-MM-YYYY');
        this.setState({ selectedEndDate: weekDayName + ' ' + date4, dateRedux: date4 });
        this.hideEndDateTimePicker();
        this.props.reservationEnd(dateRedux);
    };

    handleTimePicked = (time) => {
        var timeRedux = time.toString();
        var showTime = timeRedux.substring(16, 21)
        console.log('A date has been picked: ', showTime);
        this.setState({ selectedTime: showTime, timeRedux: showTime });
        this.setState({ selected1: showTime });
        this.hideShowTimePicker();
        this.props.reservationStartTime(showTime);
    };

    getItems(val) {
        console.log('ddfdfsa', val.substring(0, 2))
        if (val.substring(0, 2) === '04') {
            return item1;
        }
        else if (val.substring(0, 2) === '06') {
            return item2;
        }
        else if (val.substring(0, 2) === '08') {
            return item3;
        }
        else if (val.substring(0, 2) === '10') {
            return item4;
        }
        else if (val.substring(0, 2) === '12') {
            return item5;
        }
        else if (val.substring(0, 2) === '14') {
            return item6;
        }
        else if (val.substring(0, 2) === '16') {
            return item7;
        }
        else if (val.substring(0, 2) === '18') {
            return item8;
        }
        else if (val.substring(0, 2) === '20') {
            return item9;
        }
        else if (val.substring(0, 2) === '22') {
            return item10;
        }
        else if (val.substring(0, 2) === '00') {
            return item12;
        }
        else {
            return item11;
        }
    }

    // onValueChange(value) {
    //     this.setState({ selected1: value });
    //     this.props.reservationStartTime(value);
    // }

    onValueChange2(value) {
        this.setState({ selected2: value });
        this.props.reservationHour(value);
    }

    componentWillMount() {
        const { width } = Dimensions.get('window');
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
        const { container, picker, text, picker2, picker3, buttonNext, pickerCalendar, timePicker } = styles;
        const { isDateTimePickerVisible, selectedStartDate, selectedEndDate, selectedTime } = this.state;
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
                                selectedValue={this.state.location}
                                onValueChange={this.updateLocation}>
                                <Picker.Item label="ECC" value="ecc" />
                                <Picker.Item label="12Tower" value="12Tower" />
                                <Picker.Item label="HM" value="hm" />
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
                                <Picker.Item label="m" value="m" />
                                <Picker.Item label="l" value="l" />
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
                                <View style={pickerCalendar}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='today'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>
                                    <View style={picker2}>
                                        <View style={{ flex: 1, }}>
                                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                                <Text style={{ fontSize: 18 }}>Start Date</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.startDateTimePickerVisible}
                                                onConfirm={this.handleStartDatePicked}
                                                onCancel={this.hideStartDateTimePicker}
                                                datePickerModeAndroid='calendar'
                                                minimumDate={today}
                                            // maximumDate=
                                            // onPress={() => this.onStartPress(selectedStartDate)}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 16 }}>{selectedStartDate}</Text>
                                        </View>
                                    </View>
                                </View>


                                <View style={pickerCalendar}>
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
                                                minimumDate={nextDay}
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
                        {this.state.switch1Value &&
                            <View style={picker3}>
                                <View style={pickerCalendar}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='access-time'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>
                                    <View style={picker2}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showTimePicker}>
                                                <Text style={{ fontSize: 18 }}>Start Time</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker    
                                                isVisible={this.state.TimePickerVisible}
                                                onConfirm={this.handleTimePicked}
                                                onCancel={this.hideShowTimePicker}
                                                mode='time'
                                                timePickerModeAndroid='clock'                                              
                                            />
                                            <View style={pickerCalendar}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ fontSize: 16 }}>{selectedTime}</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </View >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='today'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>

                                    <View style={picker2}>
                                        <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                            <Text style={{ fontSize: 18 }}>Start Date</Text>
                                        </TouchableOpacity>
                                        <View style={timePicker}>
                                            <DateTimePicker
                                                isVisible={this.state.startDateTimePickerVisible}
                                                onConfirm={this.handleStartDatePicked}
                                                onCancel={this.hideStartDateTimePicker}
                                                datePickerModeAndroid='calendar'
                                                minimumDate={today}                                                
                                            />
                                        </View>
                                        <View style={pickerCalendar}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 16 }}>{selectedStartDate}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View >
                                <View style={picker}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='access-time'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>

                                    <View style={picker2}>
                                        <Text style={{ fontSize: 18 }}>Hour</Text>
                                        <Picker
                                            defaultLabel={"waiting"}
                                            selectedValue={this.state.selected2}
                                            onValueChange={this.onValueChange2.bind(this)}>
                                            {this.getItems(this.state.selected1).map((item, i) => {
                                                return <Picker.Item label={item} key={`${i}+1`} value={item} />
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        }

                    </View>
                </View>

                {((this.state.selectedEndDate && this.state.selectedStartDate && (this.state.switch1Value == false)) || (this.state.selectedStartDate && this.state.switch1Value)) &&
                    <View style={buttonNext}>
                        <Button onPress={this.onButtonPress.bind(this)}> Next </Button>
                    </View>
                }

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { location, size, selectedStartDate } = state.reserve;
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
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    pickerCalendar: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        height: 70
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
    timePicker: {
        backgroundColor: '#00A6A6',
    },
    picker3: {
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

export default connect(mapStateToProps, { reservationUpdate, reservationEnd, reservationSize, reservationStart, reservationHour, reservationStartTime, reservationType })(Home);
