import React, { PropTypes } from 'react';
import { Text, View, Image } from 'react-native';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import moment from 'moment';

const HistoryList = ({ booking }) => {
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

        <View style={headerContentStyle}>
          {/* <Text style={headerTextStyle}>Booking ID : {bookingID}</Text> */}
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Start Date :
            <Text style={{ fontWeight: '100', fontSize: 16 }}> {selectedStartDate} </Text>
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Start Date :
            <Text style={{ fontWeight: '100', fontSize: 16 }}> {selectedEndDate} </Text>
          </Text>
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
    fontSize: 16
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

export default HistoryList;