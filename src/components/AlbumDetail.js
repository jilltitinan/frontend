import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';

const AlbumDetail = ({ booking }) => {
  const { bookingID, startDate, endDate, location, size } = booking;
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
          <Text style={headerTextStyle}>{startDate} - {endDate}</Text>
          <Text>Location : {location}</Text>
          <Text>Size : {size} </Text>
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