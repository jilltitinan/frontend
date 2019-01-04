import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { Button } from './common/Button';
import { Icon } from 'react-native-elements';

const MoreBookingDetail = ({ album }) => {
    const { title, artist, thumbnail_image, image } = album;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle,
        buttonNext,
        containerStyle
    } = styles;
    return (

        <View style={{
            marginHorizontal: 10,
            marginTop: 10,
        }}>
            {album.title === 'Red' &&
                <View style={containerStyle}>

                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{title}</Text>
                        <Text>{artist}</Text>
                        <Text>{thumbnail_image}</Text>
                        <Icon
                            name='home'
                            color='#00aced'
                            size={100} />
                    </View>
                </View>
            }
            {album.title === 'Red' &&
                <View style={buttonNext}>
                    <Button> Show the code </Button>
                </View>
            }
        </View>

    );
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
    buttonNext: {
        justifyContent: 'flex-end',
        marginBottom: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#3C6E71',
        marginHorizontal: 10,
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }


};

// AlbumDetail.propTypes = {
//   album: PropTypes.object.isRequired
// };

export default MoreBookingDetail;