import React, { PropTypes, Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import { WhiteButton } from './common/WhiteButton'
import Confirm from './Confirm';
import { Icon } from 'react-native-elements';
import { bookingSelected } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

// const MoreBookingDetail = ({ data }) => {
class MoreBookingDetail extends Component {
    // console.log('jylllllll',data);    

    onButtonPress() {

        Alert.alert(
            'Cancle locker',
            'Are you sure to cancle this locker?',
            [
                { text: 'Yes', onPress: () => this.deleteReservation() },
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    deleteReservation = async () => {
        // console.log('delete presssssssss ', this.props.data.booking.bookingID);
        const value = await AsyncStorage.getItem('token');
        axios.delete(`https://locker54.azurewebsites.net/mobile/CancelReserve?id=${this.props.data.booking.bookingID}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response => {
                if (response.status === 200) {
                    console.log('status 200');
                    Alert.alert(
                        'Cancle successful',
                        'Press ok to go back.',
                        [
                            { text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },

                        ],
                        { cancelable: false },
                    );
                }
            }
            )
            .catch(err => {
                console.log(err.response.data);
                Alert.alert(
                    err.response.data,
                    'Press ok to go back.',
                    [
                        { text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },

                    ],
                    { cancelable: false },
                );
            });

    }

    onSetPress = async () => {
        const value = await AsyncStorage.getItem('token');
        axios.get(`https://locker54.azurewebsites.net/mobile/GetCode?id_reserve=${this.props.data.booking.bookingID}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response => {
                if (response.status === 200) {
                    console.log('status 200');
                    Actions.showthecode();
                }
            }
            )
            .catch(err => {
                Actions.entercode();
            });

    }

    render() {

        // state = { showModal: false };
        const { bookingID, startDate, endDate, location, size } = this.props.data.booking;
        const {
            headerContentStyle,
            headerTextStyle,
            buttonNext,
            containerStyle,
            bottom,
            buttonWhite,
            buttonCancle,
        } = styles;


        var weekDayName = moment(startDate).format('dddd');
        var date1 = moment(startDate).format('DD-MM-YYYY');
        var selectedStartDate = weekDayName + ' ' + date1

        var weekDayName2 = moment(endDate).format('dddd');
        var date2 = moment(endDate).format('DD-MM-YYYY');
        var selectedEndDate = weekDayName2 + ' ' + date2

        var startTime = `${startDate}`;
        var newStartTime = startTime.substring(11, 16);
        var endTime = `${endDate}`
        var newEndTime = endTime.substring(11, 16)

        return (

            <View
                style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}
            >
                <View style={containerStyle}>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>Booking ID : {bookingID}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Start Date :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}> {selectedStartDate} </Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Start Time :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}> {newStartTime}</Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            End Date :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}> {selectedEndDate}</Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            End Time :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}> {newEndTime} </Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Location :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}>  {location}</Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Size :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}> {size}</Text>
                        </Text>
                        <Icon
                            name='pages'
                            color='#909395'
                            size={120}
                        />
                    </View>
                </View>
                <View style={bottom}>
                    {/* <Button style={buttonNext}}>  </Button> */}
                    <WhiteButton style={buttonWhite} onPress={() => this.onButtonPress()} > Cancle Booking </WhiteButton>
                    <Button style={buttonNext} onPress={() => this.onSetPress()}> Show the code </Button>
                </View>

            </View>
        );
    }
};


const styles = {
    headerContentStyle: {
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        marginHorizontal: 10,
        backgroundColor: '#3C6E71',
        elevation: 2,
    },
    buttonWhite: {
        marginBottom: 15,
        borderRadius: 4,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        elevation: 2,
    },

    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },


};

const mapStateToProps = ({ booking }) => {
    const { data } = booking;
    return { data };
};


export default connect(mapStateToProps, { bookingSelected })(MoreBookingDetail);