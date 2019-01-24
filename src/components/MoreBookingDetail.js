import React, { PropTypes } from 'react';
import { Text, View, Image, Actions } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import { Button } from './common/Button';
import { Icon } from 'react-native-elements';

const MoreBookingDetail = ({ album }) => {
    
    console.log('jylllllll',album[0]);
     
    
    const { title, artist, thumbnail_image, image } = album;
    const {
        headerContentStyle,
        headerTextStyle,
        buttonNext,
        containerStyle,
        bottom,
    } = styles;
    if (album.title === 'Red') {
        
        return (
            
            <View
                style={{
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
                            name='launch'
                            color='#909395'
                            size={120}
                            />
                    </View>
                </View>
                <View style={bottom}>
                    <Button style={buttonNext}  > Show the code </Button>
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
        borderWidth: 0.5,
        borderColor: '#3C6E71',
        marginHorizontal: 10,
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    }


};


export default MoreBookingDetail;