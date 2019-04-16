import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import moment from 'moment';
import { Icon } from 'react-native-elements';


const InboxDetail = ({ booking }) => {
    const { bookingID, startDate, endDate, location, size } = booking;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle
    } = styles;

    var weekDayName = moment(startDate).format('dddd');
    var date1 = moment(startDate).format('DD-MM-YYYY');
    var selectedStartDate = weekDayName + ' ' + date1

    var weekDayName2 = moment(endDate).format('dddd');
    var date2 = moment(endDate).format('DD-MM-YYYY');
    var selectedEndDate = weekDayName2 + ' ' + date2

    return (
        <Card>
            <CardSection>
                <View style={{flexDirection: 'column', alignItems: 'center', padding: 5,}}>
                    <Icon
                        name='mail'
                        color='#C4C4C4'
                        size={40}
                    />
                </View>

                <View style={headerContentStyle}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Almost time up!
                    </Text>
                    <Text style={{ fontWeight: '100', fontSize: 16 }}>
                        Don't forget to bring anything out.
                    </Text>

                </View>

            </CardSection>
        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
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
    }
};

// AlbumDetail.propTypes = {
//   album: PropTypes.object.isRequired
// };

export default InboxDetail;