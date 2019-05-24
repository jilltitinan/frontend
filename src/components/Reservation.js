import React, { Component } from 'react';
import { View, Image, Picker, Text, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import DateTimePicker from './common/DatePicker';
import { Icon } from 'react-native-elements';
import { reservationUpdate, reservationSize, reservationStart, reservationEnd, reservationHour, reservationStartTime, reservationType } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { SwitchHome } from './common/SwitchHome';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import moment from 'moment';
import axios from 'axios';

var today = new Date();
var nextDay = new Date();
class Home extends Component {

    state = {
        user: '',
        startDate: '',
        endDate: '',
        selectedStartDate: " ",
        selectedEndDate: " ",
        selectedTime: '',
        startDateTimePickerVisible: false,
        endDateTimePickerVisible: false,
        select: 'moment',
        timeCheck: '',
        currentCheck: '',
        locker: [],
    };

    componentDidMount = async () => {
        // https://celocker54.azurewebsites.net/web/Locker
        const value = await AsyncStorage.getItem('token');
        await axios.get(`https://celocker54.azurewebsites.net/mobile/Locker`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response =>
                this.setState({ locker: response.data })

            )
        // console.log("locker ", this.state.locker)


    }

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

    handleStartDatePicked = (date1) => {
        this.setState({ startDate: date1 });
        var dateRedux = date1.toString();
        var weekDayName = moment(date1).format('dddd');
        var date3 = moment(date1).format('DD MMM YYYY');
        this.setState({ selectedStartDate: weekDayName + ' ' + date3, dateRedux: date3 });
        this.hideStartDateTimePicker();
        this.props.reservationStart(dateRedux);
        nextDay = date1;
        nextDay.setDate(nextDay.getDate() + 1);
        var startMoment = moment.utc(this.state.startDate, "YYYY-MM-DD HH").local().format('YYYY-MMM-DD')
        var endMoment = moment.utc(this.state.endDate, "YYYY-MM-DD HH").local().format('YYYY-MMM-DD')
        var currentDate = moment.utc(new Date(), "YYYY-MM-DD").add(1, 'days').local().format('YYYY-MMM-DD')
        if (startMoment < endMoment) {
            this.setState({ selectedEndDate: ' ' })
        }
        if (((this.state.currentCheck - this.state.timeCheck) >= 5) && (startMoment === currentDate)) {
            this.setState({ selectedTime: ' ' })
        }
        else {
            console.log("error handleStartDatePicked ", currentDate, startMoment)
            this.setState({ selectedEndDate: ' ' })
        }
    };

    handleEndDatePicked = (date) => {
        var dateRedux = date.toString();
        var weekDayName = moment(date).format('dddd');
        var date4 = moment(date).format('DD MMM YYYY');
        this.setState({ selectedEndDate: weekDayName + ' ' + date4, dateRedux: date4 });
        this.hideEndDateTimePicker();
        this.props.reservationEnd(dateRedux);
    };

    handleTimePicked = (time) => {

        var startMoment = moment.utc(this.state.startDate, "YYYY-MM-DD").local().format('YYYY-MMM-DD')
        var currentDate = moment.utc(new Date(), "YYYY-MM-DD").add(1, 'days').local().format('YYYY-MMM-DD')
        var timeRedux = time.toString();
        var showTime = timeRedux.substring(16, 21)
        var timeHour = showTime.substring(0, 2)
        var newtime = parseInt(timeHour) * 60 + (parseInt(showTime.substring(3, 6)))
        var current = new Date().toTimeString();
        var currentTime = parseInt(current.substring(0, 2)) * 60 + (parseInt(current.substring(3, 6)));
        this.setState({ timeCheck: newtime, currentCheck: currentTime });
        this.setState({ selectedTime: showTime, timeRedux: showTime });
        this.setState({ selected1: showTime });
        if (((currentTime - newtime) >= 5) && (startMoment === currentDate)) {
            this.setState({ selectedTime: ' ' });
        }
        this.hideShowTimePicker();
        this.props.reservationStartTime(showTime);
    };

    getItems(val) {
        if (val.substring(0, 2) === '00') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']; }
        else if (val.substring(0, 2) === '01') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']; }
        else if (val.substring(0, 2) === '02') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']; }
        else if (val.substring(0, 2) === '03') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']; }
        else if (val.substring(0, 2) === '04') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']; }
        else if (val.substring(0, 2) === '05') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18']; }
        else if (val.substring(0, 2) === '06') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17']; }
        else if (val.substring(0, 2) === '07') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']; }
        else if (val.substring(0, 2) === '08') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']; }
        else if (val.substring(0, 2) === '09') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']; }
        else if (val.substring(0, 2) === '10') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']; }
        else if (val.substring(0, 2) === '11') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']; }
        else if (val.substring(0, 2) === '12') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']; }
        else if (val.substring(0, 2) === '13') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; }
        else if (val.substring(0, 2) === '14') { return ['1', '2', '3', '4', '5', '6', '7', '8', '9']; }
        else if (val.substring(0, 2) === '15') { return ['1', '2', '3', '4', '5', '6', '7', '8']; }
        else if (val.substring(0, 2) === '16') { return ['1', '2', '3', '4', '5', '6', '7']; }
        else if (val.substring(0, 2) === '17') { return ['1', '2', '3', '4', '5', '6']; }
        else if (val.substring(0, 2) === '18') { return ['1', '2', '3', '4', '5']; }
        else if (val.substring(0, 2) === '19') { return ['1', '2', '3', '4']; }
        else if (val.substring(0, 2) === '20') { return ['1', '2', '3']; }
        else if (val.substring(0, 2) === '21') { return ['1', '2',]; }
        else if (val.substring(0, 2) === '22') { return ['1',]; }
        else { return ['0']; }
    }

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

    renderPickerItem(locker = []) {
        return locker.map(address => 
            <Picker.Item label={address.location} value={address.location} key={address.mac_address} />
        )
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
                                {/* <Picker.Item label="ecc" value="ecc" />
                                <Picker.Item label="12Tower" value="12Tower" />
                                <Picker.Item label="HM" value="hm" /> */}
                                { this.renderPickerItem(this.state.locker) }
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
                                <Picker.Item label="l" value="l" />
                            </Picker>
                        </View>
                    </View>

                    <View style={picker3}>
                        <SwitchHome
                            toggleSwitch1={this.toggleSwitch1}
                            switch1Value={this.state.switch1Value} />
                        <Text style={{ textAlign: 'right' }}>Multi-day/One day</Text>
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
                                            <TouchableOpacity onPress={this.showStartDateTimePicker} hitSlop={{ top: 20, bottom: 100, left: 50, right: 200 }}>
                                                <Text style={{ fontSize: 18 }}>Start Date</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                                <DateTimePicker
                                                    isVisible={this.state.startDateTimePickerVisible}
                                                    onConfirm={this.handleStartDatePicked}
                                                    onCancel={this.hideStartDateTimePicker}
                                                    datePickerModeAndroid='calendar'
                                                    minimumDate={today}
                                                // maximumDate={30}
                                                // onPress={() => this.onStartPress(selectedStartDate)}
                                                /></TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                                <Text style={{ fontSize: 16 }}>{selectedStartDate}</Text>
                                            </TouchableOpacity>
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
                                            <TouchableOpacity onPress={this.showEndDateTimePicker} hitSlop={{ top: 20, bottom: 100, left: 50, right: 200 }}>
                                                <Text style={{ fontSize: 18 }}>End Date</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.endDateTimePickerVisible}
                                                onConfirm={this.handleEndDatePicked}
                                                onCancel={this.hideEndDateTimePicker}
                                                datePickerModeAndroid='calendar'
                                                minimumDate={nextDay}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                                <Text style={{ fontSize: 16 }}>{selectedEndDate}</Text>
                                            </TouchableOpacity>
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
                                            name='today'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>

                                    <View style={picker2}>
                                        <TouchableOpacity onPress={this.showStartDateTimePicker} hitSlop={{ top: 20, bottom: 100, left: 50, right: 200 }}>
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
                                        <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                            <Text style={{ fontSize: 16, paddingTop: 10 }}>{selectedStartDate}</Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                                <View style={pickerCalendar}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='access-time'
                                            color='#00A6A6'
                                            size={40} />
                                    </View>
                                    <View style={picker2}>
                                        <View style={{ flex: 1 }}>
                                            <TouchableOpacity onPress={this.showTimePicker} hitSlop={{ top: 20, bottom: 100, left: 50, right: 200 }}>
                                                <Text style={{ fontSize: 18 }}>Start Time</Text>
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                isVisible={this.state.TimePickerVisible}
                                                onConfirm={this.handleTimePicked}
                                                onCancel={this.hideShowTimePicker}
                                                mode='time'
                                                timePickerModeAndroid='clock'
                                            />
                                            <View style={{ flex: 1, paddingTop: 5 }}>
                                                <TouchableOpacity onPress={this.showTimePicker}>
                                                    <Text style={{ fontSize: 16 }}>{selectedTime}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name='timer'
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
                                </View >

                            </View>
                        }

                    </View>
                </View>

                {(((this.state.selectedEndDate != null) && (this.state.selectedStartDate) && (this.state.switch1Value == false)) || (this.state.selectedStartDate && this.state.switch1Value && this.state.selectedTime)) &&
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
        // borderRadius: 4,
        // borderWidth: 0.5,
        // borderColor: '#d6d7da',
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
