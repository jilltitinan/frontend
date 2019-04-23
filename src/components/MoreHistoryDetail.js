import React, { PropTypes, Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { WhiteButton } from './common/WhiteButton';
import { historySelected } from '../actions';
import { connect } from 'react-redux';
import { Button } from './common/Button';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

class MoreHistoryDetail extends Component {

    onSetPress() {
        axios.get(`https://lockerce54.azurewebsites.net/mobile/GetCode?id_reserve=${this.props.data.past.bookingID}`)
            .then(response => {
                if (response.status === 200) {
                    console.log('status 200');
                    Actions.shownocode();
                }
            }
            )
            .catch(err => {
                console.log(err)
                Actions.shownocode();
            });

    }

    render() {

        // state = { showModal: false };
        const { bookingID, startDate, endDate, location, size } = this.props.data.past;
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
                            <Text style={{ fontWeight: '100',  fontSize: 16 }}> {selectedStartDate} </Text>
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

                    <Button style={buttonNext} onPress={() => this.onSetPress()}> Show the code </Button>
                </View>

            </View>
        );
    }
};

const mapStateToProps = ({ past }) => {
    const { data } = past;
    return { data };
};


const styles = {
    headerContentStyle: {
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18,
        fontWeight:'bold'
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


export default connect(mapStateToProps, { historySelected })(MoreHistoryDetail);