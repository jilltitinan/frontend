import React, { PropTypes, Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import Confirm from './Confirm';
import { Icon } from 'react-native-elements';
import { reservationId, bookingSelected } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { WhiteButton } from './common/WhiteButton';


// const MoreBookingDetail = ({ data }) => {
class Afterbooked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
        }
    }

    componentDidMount = async () => {
        const valueToken = await AsyncStorage.getItem('token');
        axios.get(`https://locker54.azurewebsites.net/mobile/BookingDetail?id_reserve=${this.props.id}`,
            { headers: { "Authorization": `Bearer ${valueToken}` } })
            .then(res => {
                const info = res.data
                this.setState({ detail: info })
                this.props.bookingSelected(this.state.detail);
                console.log('detailll ' + this.state.detail);
            }).catch(function (error) {
                console.log(error.state.data);
            });
    }

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
        Alert.alert(
            'Cancle successful',
            'Press ok to go back.',
            [
                { text: 'OK', onPress: () => console.log('go back Pressed'), style: 'cancel', },

            ],
            { cancelable: false },
        );
    }

    render() {

        var weekDayName = moment(this.state.detail.startDate).format('dddd');
        var date1 = moment(this.state.detail.startDate).format('DD-MM-YYYY');
        var selectedStartDate = weekDayName + ' ' + date1

        var weekDayName2 = moment(this.state.detail.endDate).format('dddd');
        var date2 = moment(this.state.detail.endDate).format('DD-MM-YYYY');
        var selectedEndDate = weekDayName2 + ' ' + date2


        var startTime = `${this.state.detail.startDate}`;
        var newStartTime = startTime.substring(11, 16);
        var endTime = `${this.state.detail.endDate}`
        var newEndTime = endTime.substring(11, 16)
        // var newId = this.props.result.id_account.toString();
        // var newId_accout = this.props.result.id_account;
        // var newEndtime = parseInt(this.props.time);
        // var newHour = parseInt(this.props.hour);
        // var newDuration = newEndtime + newHour;
        // var newTime = this.props.time.toString();

        const {
            headerContentStyle,
            headerTextStyle,
            buttonNext,
            containerStyle,
            bottom,
            WhiteButtonNext,
        } = styles;

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
                        <Text style={headerTextStyle}>Booking ID : {this.state.detail.bookingID}</Text>
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
                            <Text style={{ fontWeight: '100', fontSize: 16 }}>  {this.state.detail.location}</Text>
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Size :
                            <Text style={{ fontWeight: '100', fontSize: 16 }}> {this.state.detail.size}</Text>
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
                    <WhiteButton style={WhiteButtonNext} onPress={() => this.onButtonPress()}> Cancle Booking </WhiteButton>
                    <Button style={buttonNext} onPress={() => Actions.entercode()}> Show the code </Button>
                </View>

            </View>
        );
    }
};

const mapStateToProps = (state) => {
    const { id } = state.reserve;
    return { id };
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
    WhiteButtonNext: {
        marginBottom: 15,
        borderRadius: 4,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 2,

    },
    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },


};


export default connect(mapStateToProps, { reservationId, bookingSelected })(Afterbooked);