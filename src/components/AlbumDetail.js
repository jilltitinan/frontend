import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';

const AlbumDetail = ({ booking }) => {
  const {id_reserve, code } = booking;
  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;
  return (
    <Card>
      <CardSection>
       
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{id_reserve}</Text>
          <Text>{code}</Text>
        </View> 
        <View style={thumbnailContainerStyle}>
          <Text>{code}</Text>
        </View>

      </CardSection>      
    </Card>
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
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

// AlbumDetail.propTypes = {
//   album: PropTypes.object.isRequired
// };

export default AlbumDetail;