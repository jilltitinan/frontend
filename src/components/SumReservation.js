import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { reservationUpdate, reservationSize, reservationStart, reservationEnd, reservationHour, reservationStartTime, reservationType } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import axios from 'axios';


class SumReservation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id_reserve: 0,
            code: '',
            isActive: true,
            status: '',
            startDay: '',
            endDay: '',
            startTime: '',
            endTime: '',
            dateModified: '',
            optional: false,
            size: '',
            location: '',
            id_account: '',
            id_vacancy: 0,
        }
    }

    componentWillMount() {
        const { width } = Dimensions.get('window');

        // Responsive Condition
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
        this.setState({
            id_reserve: 0,
            code: '',
            isActive: true,
            status: '',
            startDay: '',
            endDay: '',
            startTime: '',
            endTime: '',
            dateModified: '',
            optional: false,
            size: this.props.size,
            location: '',
            id_account: '',
            id_vacancy: 0,
        })

        console.log('axios ' + this.props.date + 'T' + this.props.size)
        axios.post('https://locker54.azurewebsites.net/api/Reservation/AddReserve', {


            "id_reserve": 0,
            "code": "string",
            "isActive": true,
            "status": "string",
            "startDay": "2019-07-14",
            "endDay": "2019-07-16T23:59",
            "startTime": "2019-02-14T10:37:20.999Z",
            "endTime": "2019-02-14T10:37:20.999Z",
            "dateModified": "2019-02-14T10:37:20.999Z",
            "optional": false,
            "size": this.props.size,
            "location": "ecc",
            "id_account": "123456789",
            "id_vacancy": 0

        })
            .then(res => {
                console.log('ress ' + res);
                console.log('res dataa' + res.data);
            })
            .catch(error => console.log(error.res.data))
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
        if (this.props.value) {
            return (
                <View style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}>
                    <Card>
                        <CardSection>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{this.props.date}</Text>
                                <Text>{'Locker size: ' + this.props.size}</Text>
                                <Text>{'Location: ' + this.props.location}</Text>
                                <Text>{'Total Hour: ' + this.props.hour}</Text>
                                <Text>{'Start Time: ' + this.props.time}</Text>
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
                                <Text style={headerTextStyle}>{this.props.date + ' - ' + this.props.endDate}</Text>
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
    // console.log("before mapstateToProps   "+ state.reserve);
    const { location, size, date, endDate, hour, time, value } = state.reserve;
    // console.log("after  "+ l2 + "  "+ s2);
    return { location, size, date, endDate, hour, time, value };
};


export default connect(mapStateToProps, { reservationUpdate, reservationSize, reservationStart, reservationEnd, reservationHour, reservationStartTime, reservationType })(SumReservation);
