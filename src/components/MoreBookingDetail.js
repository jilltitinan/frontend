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
            containerStyle,
            bottom,
        } = styles;
        if (album.title === 'Red') {
            return (
                <View 
                    style = {{ 
                        marginHorizontal: 10,
                        marginTop: 10,
                        // backgroundColor: 'red',
                        flex: 1,
                    }}
                >
                    <View style={containerStyle}>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>{title}</Text>
                            <Text>{artist}</Text>
                            <Text>{thumbnail_image}</Text>
                            <Icon
                                name='home'
                                color='#00aced'
                                size={100}
                                style={{}} />
                        </View>
                    </View>
                    <View style={bottom}>
                        <Button style={buttonNext} > Show the code </Button>
                    </View>
                </View>
            );
        };
        return (
            <View />
        );
};

const styles = {
    headerContentStyle: {
        // flexDirection: 'column',
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        // justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonNext: {
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
        borderColor: '#ddd',
        // flex: 1,
    }


};

// AlbumDetail.propTypes = {
//   album: PropTypes.object.isRequired
// };

export default MoreBookingDetail;