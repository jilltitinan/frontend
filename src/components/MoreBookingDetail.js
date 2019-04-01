import React, { PropTypes, Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import Confirm from './Confirm';
import { Icon } from 'react-native-elements';
import { bookingSelected } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

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

    deleteReservation() {
        console.log('delete presssssssss ', this.props.data.booking.bookingID);
        axios.delete(`https://locker54.azurewebsites.net/mobile/CancelReserve?id=${this.props.data.booking.bookingID}`)
            .then(response => {
                if (response.status === 200) {
                   console.log('status 200');
                   Alert.alert(
                    'Cancle successful',
                    'Press ok to go back.',
                    [
                      {text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel',},
                      
                    ],
                    {cancelable: false},
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
                      {text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel',},
                      
                    ],
                    {cancelable: false},
                  );
            });

    }

    onSetPress() {
        axios.get(`https://locker54.azurewebsites.net/mobile/GetCode?id_reserve=${this.props.data.booking.bookingID}`)
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
            buttonCancle,
        } = styles;
        // if (data.title === 'Red') {
        // console.log('data title ', data);
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
                        {/* <Text style={headerTextStyle}>{id_reserve}</Text> */}
                        <Text>{bookingID}</Text>
                        <Text>{startDate}</Text>
                        <Icon
                            name='launch'
                            color='#909395'
                            size={120}
                        />
                    </View>
                </View>
                <View style={bottom}>
                    {/* <Button style={buttonNext}}>  </Button> */}
                    <Button style={buttonNext} onPress={() => this.onButtonPress()} > Cancle Booking </Button>
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
        fontSize: 18
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