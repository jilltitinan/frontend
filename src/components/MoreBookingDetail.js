import React, { PropTypes, Component } from 'react';
import { Text, View, Image, Actions } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import  Confirm  from './Confirm';
import { Icon } from 'react-native-elements';
import { bookingSelected } from '../actions';
import { connect } from 'react-redux';

// const MoreBookingDetail = ({ data }) => {
class MoreBookingDetail extends Component {
    // console.log('jylllllll',data);    
    render() {
        
        // state = { showModal: false };
        const { title, artist, thumbnail_image, image } = this.props.data.album;
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
                        <Text style={headerTextStyle}>{title}</Text>
                        <Text>{artist}</Text>
                        <Text>{thumbnail_image}</Text>
                        <Icon
                            name='launch'
                            color='#909395'
                            size={120}
                        />
                    </View>
                </View>
                <View style={bottom}>
                    {/* <Button style={buttonNext}}>  </Button> */}
                    <Confirm style={buttonNext} > Cancle Booking </Confirm>
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