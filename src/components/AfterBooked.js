import React, { PropTypes, Component } from 'react';
import { Text, View, Image,  Alert } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import Confirm from './Confirm';
import { Icon } from 'react-native-elements';
import { reservationId } from '../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

// const MoreBookingDetail = ({ data }) => {
class Afterbooked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
        }
    }

    onButtonPress() {
        Alert.alert(
            'Cancle locker',
            'Are you sure to cancle this locker?',
            [
              {text: 'Yes', onPress: () => this.deleteReservation()},
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
    }

    deleteReservation() {
        Alert.alert(
            'Cancle successful',
            'Press ok to go back.',
            [
              {text: 'OK', onPress: () => console.log('go back Pressed'), style: 'cancel',},
              
            ],
            {cancelable: false},
          );
    }
    
    render() {
        axios.get(`https://locker54.azurewebsites.net/web/ReserveDetail?id_reserve=${this.props.id}`)
            .then(res => {
                const info = res.data
                this.setState({ detail: info })
                // console.log('detailll ' + this.state.detail);
            }).catch(function (error) {
                console.log(error.state.data);
            });


        //  Object {
        //     "bookingID": 30,
        //     "dateModified": "2019-03-18T08:38:57.829",
        //     "endDate": "2019-07-23T00:00:00",
        //     "id_user": "58010326",
        //     "location": "twv",
        //     "name": "titinan prajwatanakij",
        //     "numberVacancy": "01",
        //     "size": "s",
        //     "startDate": "2019-07-22T00:00:00",
        //     "status": "Unuse",
        //   }

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
                        <Text style={headerTextStyle}>{this.state.detail.bookingID}</Text>
                        <Text>{this.state.detail.dateModified}</Text>
                        <Text>{this.state.detail.id_user}</Text>
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