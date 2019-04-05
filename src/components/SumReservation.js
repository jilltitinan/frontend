import React, { Component } from 'react';
import { Text, View, Dimensions, Alert } from 'react-native';
import { reservationUpdate, reservationSize, reservationStart, reservationEnd, reservationHour, reservationStartTime, reservationType, authen, reservationId } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import axios from 'axios';
import moment from 'moment';

class SumReservation extends Component {
    state = {
        user: '',
        selectedStartDate: " ",
        selectedEndDate: " ",
        startDateTimePickerVisible: false,
        endDateTimePickerVisible: false,
        select: 'moment',
    };

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

    onButtonPress() {

        var newdate = this.props.date.split("-").reverse().join("-");
        var newnewdate = newdate.toString();
        var newEndDate = this.props.endDate.split("-").reverse().join("-");
        var newId = this.props.result.user.email.toString();
        var newId_accout = newId.substring(0, newId.length - 12);
        var newEndtime = parseInt(this.props.time);
        var newHour = parseInt(this.props.hour);
        var newDuration = newEndtime + newHour;
        var newTime = this.props.time.toString();

        if (this.props.valueType == 'true') { // one day

            axios.post('https://locker54.azurewebsites.net/mobile/AddReserve', {

                "id_reserve": 0,
                "code": "string",
                "isActive": true,
                "status": "unuse",
                "startDay": newnewdate + 'T0' + newTime + ':00Z',
                "endDay": newnewdate + 'T0' + newDuration + ':00:00Z',
                "dateModified": "2019-03-27T08:40:32.391Z",
                "size": this.props.size,
                "location": this.props.location,
                "id_account": newId_accout,
                "id_vacancy": 0
            })
                .then(res => {
                    if (res.status == 200) {
                        this.props.reservationId(res.data);
                        Actions.afterbooked();
                    }
                })
                .catch(error => {

                    Alert.alert(
                        'Reservation Failed',
                        error.response.data,
                        [
                            { text: 'OK', onPress: () => Actions.Reserve() },
                        ],
                        { cancelable: false },
                    );

                })
        } else { //more than one day

            axios.post('https://locker54.azurewebsites.net/mobile/AddReserve', {

                "id_reserve": 0,
                "code": "string",
                "isActive": true,
                "status": "string",
                "startDay": newnewdate + 'T' + '00:00:00Z',
                "endDay": newEndDate + 'T' + '23:59:59Z',
                "dateModified": "2019-03-27T08:40:32.391Z",
                "size": this.props.size,
                "location": this.props.location,
                "id_account": newId_accout,
                "id_vacancy": 0

            })
                .then(res => {
                    if (res.status == 200) {
                        this.props.reservationId(res.data);
                        Actions.afterbooked();
                    }
                })
                .catch(error => {

                    Alert.alert(
                        'Reservation Failed',
                        error.response.data,
                        [
                            { text: 'OK', onPress: () => Actions.Reserve() },
                        ],
                        { cancelable: false },
                    );
                })
        }
    }

    render() {
        // const { title, artist, thumbnail_image, image } = album;
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle,
            bottom,
            buttonNext,
        } = styles;

            var weekDayName = moment(this.props.date).format('dddd');
            var date1 = moment(this.props.date).format('DD-MM-YYYY');
            var selectedStartDate =  weekDayName + ' ' + date1 

            var weekDayName2 = moment(this.props.endDate).format('dddd');
            var date2 = moment(this.props.date).format('DD-MM-YYYY');
            var selectedEndDate =  weekDayName2 + ' ' + date2 

        if (this.props.valueType == 'true') {
            return (
                <View style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}>
                    <Card>
                        <CardSection>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{selectedStartDate}</Text>
                                <Text>{'Locker size: ' + this.props.size}</Text>
                                <Text>{'Location: ' + this.props.location}</Text>
                                <Text>{'Total Hour: ' + this.props.hour}</Text>
                                <Text>{'Start Time: ' + this.props.valueType}</Text>
                            </View>
                        </CardSection>
                    </Card>
                    <View style={bottom}>
                        <Button style={buttonNext} onPress={this.onButtonPress.bind(this)}> Submit </Button>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}>
                    <Card>
                        <CardSection>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{selectedStartDate}</Text>
                                <Text> to </Text>
                                <Text style={headerTextStyle}>{selectedEndDate}</Text>
                                <Text>{'Locker size: ' + this.props.valueType}</Text>
                                <Text>{'Location: ' + this.props.location}</Text>
                            </View>
                        </CardSection>
                    </Card>
                    <View style={bottom}>
                        <Button style={buttonNext} onPress={this.onButtonPress.bind(this)} > Submit </Button>
                    </View>
                </View>
            )
        }
    }
};
const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        backgroundColor: '#FFCD00',
        elevation: 2,
        marginHorizontal: 10,
    },
};


const mapStateToProps = (state) => {
    const { location, size, date, endDate, hour, time, valueType } = state.reserve;
    const { result } = state.auth;
    return { location, size, date, endDate, hour, time, valueType, result };
};


export default connect(mapStateToProps, { authen, reservationId, reservationUpdate, reservationSize, reservationStart, reservationEnd, reservationHour, reservationStartTime, reservationType })(SumReservation);
