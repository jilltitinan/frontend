import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { authen, bookingSelected } from '../actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

const InboxDetail = ({ booking }) => {
    const { headerContentStyle, } = styles;


    return (
        <Card>
            <CardSection>
                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 5, }}>
                    <Icon
                        name='mail'
                        color='#C4C4C4'
                        size={40}
                    />
                </View>

                <View style={headerContentStyle}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Notification!
                    </Text>
                    <Text style={{ fontWeight: '100', fontSize: 16 }}>
                        {booking.content}
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

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen, bookingSelected })(InboxDetail);