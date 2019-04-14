import React, { PropTypes, Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import Confirm from './Confirm';
import { Icon } from 'react-native-elements';
import { reservationId } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';


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

        var newdate = moment(this.props.date).format('YYYY-MM-DD');
        var newnewdate = newdate.toString();
        var newEndDate = moment(this.props.endDate).format('YYYY-MM-DD');
        // var newId = this.props.result.id_account.toString();
        var newId_accout = this.props.result.id_account;
        var newEndtime = parseInt(this.props.time);
        var newHour = parseInt(this.props.hour);
        var newDuration = newEndtime + newHour;
        var newTime = this.props.time.toString();

        const {
            headerContentStyle,
            headerTextStyle,
            buttonNext,
            containerStyle,
            bottom,
            buttonCancle,
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
                        <Text>Start Date : {this.state.detail.startDate}</Text>
                        <Text>Start Time : {this.state.detail.endDate}</Text>
                        <Text>End Date : {this.state.detail.endDate}</Text>
                        <Text>End Time : {this.state.detail.endDate}</Text>
                        <Text>Location : {this.state.detail.location}</Text>
                        <Text>Size : {this.state.detail.size}</Text>
                        <Icon
                            name='launch'
                            color='#909395'
                            size={120}
                        />
                    </View>
                </View>
                <View style={bottom}>
                    {/* <Button style={buttonNext}}>  </Button> */}
                    <Button style={buttonNext} onPress={() => this.onButtonPress()}> Cancle Booking </Button>
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


export default connect(mapStateToProps, { reservationId })(Afterbooked);