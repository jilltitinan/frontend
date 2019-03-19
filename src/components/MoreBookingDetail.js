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

// const MoreBookingDetail = ({ data }) => {
class MoreBookingDetail extends Component {
    // console.log('jylllllll',data);    

    onButtonPress() {

        Alert.alert(
            'Cancle locker',
            'Your email is incorrect.',
            [
              {text: 'OK', onPress: () => console.log('Cancel Pressed')},
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );

        // axios.delete(`https://locker54.azurewebsites.net/api/Reservation/Delete?id_reserve=${this.props.id}`)
        // .then(Bu
        //     // Observe the data keyword this time. Very important
        //     // payload is the request body
        //     // Do something
        //   )
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
                        <Text>{size}</Text>
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
                    <Button style={buttonNext} > Show the code </Button>
                </View>

            </View>
        );
    }
};

const mapStateToProps = ({ booking }) => {
    const { data } = booking;
    return { data };
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


export default connect(mapStateToProps, { bookingSelected })(MoreBookingDetail);