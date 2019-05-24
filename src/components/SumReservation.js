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
import { AsyncStorage } from 'react-native';
import { Loading } from './common/Loader';

class SumReservation extends Component {
    state = {
        selectedStartDate: " ",
        selectedEndDate: " ",
        isLoading: false,
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

    onButtonPress = async () => {

        var newdate = moment(this.props.date).format('YYYY-MM-DD');
        var newnewdate = newdate.toString();
        var newEndDate = moment(this.props.endDate).format('YYYY-MM-DD');
        // var newId = this.props.result.id_account.toString();
        var newId_accout = this.props.result.id_account;
        var newEndtime = parseInt(this.props.time);
        var newHour = parseInt(this.props.hour);
        var newDuration = newEndtime + newHour;
        var newMinute = this.props.time.substring(3, 5);
        var newTime = this.props.time.toString();
        console.log("new duration ", newDuration)

        if (this.props.valueType == 'true' && this.state.isLoading === false && newDuration > 9) { // one day
            const valueToken = await AsyncStorage.getItem('token');
            axios.post('https://celocker54.azurewebsites.net/mobile/AddReserve', {
                "id_reserve": 0,
                "code": "string",
                "isActive": true,
                "status": "unuse",
                "startDay": newnewdate + 'T' + newTime + ':00Z',
                "endDay": newnewdate + 'T' + newDuration + ':' + newMinute + ':00Z',
                "dateModified": "2019-03-27T08:40:32.391Z",
                "size": this.props.size,
                "location": this.props.location,
                "id_account": newId_accout,
                "id_vacancy": 0
            },
                { headers: { "Authorization": `Bearer ${valueToken}` } }
            )
                .then(res => {
                    if (res.status == 200) {
                        this.props.reservationId(res.data);
                        Actions.afterbooked();
                    }
                })
                .catch(error => {
                    Actions.fullreserve();
                })
        } else if (this.props.valueType == 'false' && this.state.isLoading === false) { //more than one day
            try {
                const valueToken = await AsyncStorage.getItem('token');
                axios.post('https://celocker54.azurewebsites.net/mobile/AddReserve', {
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
                },
                    { headers: { "Authorization": `Bearer ${valueToken}` } }
                )
                    .then(res => {
                        if (res.status == 200) {
                            console.log("Reserve ID sum reserve", res.data)
                            this.props.reservationId(res.data);
                            Actions.afterbooked();
                        }
                    })
                    .catch(error => {
                        Actions.fullreserve();

                    })
            } catch (error) {
                Actions.fullreserve();
            }
        } else if (this.props.valueType == 'true' && this.state.isLoading === false && newDuration < 10) { // one day
            const valueToken = await AsyncStorage.getItem('token');
            axios.post('https://celocker54.azurewebsites.net/mobile/AddReserve', {
                "id_reserve": 0,
                "code": "string",
                "isActive": true,
                "status": "unuse",
                "startDay": newnewdate + 'T' + newTime + ':00Z',
                "endDay": newnewdate + 'T0' + newDuration + ':' + newMinute + ':00Z',
                "dateModified": "2019-03-27T08:40:32.391Z",
                "size": this.props.size,
                "location": this.props.location,
                "id_account": newId_accout,
                "id_vacancy": 0
            },
                { headers: { "Authorization": `Bearer ${valueToken}` } }
            )
                .then(res => {
                    if (res.status == 200) {
                        this.props.reservationId(res.data);
                        Actions.afterbooked();
                    }
                })
                .catch(error => {
                    Actions.fullreserve();
                })
        }
        
        else {
            return (
                <Loading />
            )
        }
    }

    render() {
        console.disableYellowBox = true;
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
        var date1 = moment(this.props.date).format('DD MMM YYYY');
        var selectedStartDate = weekDayName + ' ' + date1

        var weekDayName2 = moment(this.props.endDate).format('dddd');
        var date2 = moment(this.props.endDate).format('DD MMM YYYY');
        var selectedEndDate = weekDayName2 + ' ' + date2

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
                                <Text>{'Start Time: ' + this.props.time}</Text>
                                <Text>{'Total Hour: ' + this.props.hour}</Text>
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
                                <Text>{'Locker size: ' + this.props.size}</Text>
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
