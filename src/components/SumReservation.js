import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { reservationUpdate, reservationSize, reservationStart, reservationEnd } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';


class SumReservation extends Component {
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
                    <Button style={buttonNext} > Submit </Button>
                </View>
            </View>

        );

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
    const { location, size, date, endDate } = state.reserve;
    // console.log("after  "+ l2 + "  "+ s2);
    return { location, size, date, endDate };
};


export default connect(mapStateToProps, { reservationUpdate, reservationSize, reservationStart, reservationEnd })(SumReservation);
