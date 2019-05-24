import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button } from './common/Button';
import { WhiteButton } from './common/WhiteButton';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

class FullReservation extends Component {
  componentWillMount() {
    const { width } = Dimensions.get('window');
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
    const { bottom, buttonNext, iconStyle,buttonWhite } = styles;
    return (
      <View style={{ flex: 1, }}>
        <View style={iconStyle}>
          <Icon
            name='compare'
            color='#00A6A6'
            size={80} />
            <Text>
              No Locker Avalible
            </Text>
        </View>

        <View style={bottom}>
          <WhiteButton style={buttonWhite} onPress={() => Actions.Reserve()}> Back to Reservation </WhiteButton>
          <Button style={buttonNext} onPress={() => Actions.Home()}> Back to Home </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  bottom: {
    justifyContent: 'flex-end',
    flex: 0.2,
    // backgroundColor: 'green',
  },
  buttonNext: {
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 0.5,
    marginHorizontal: 10,
    backgroundColor: '#00A6A6',
  },
  buttonWhite: {
    marginBottom: 15,
    borderRadius: 4,
    borderWidth: 0.5,
    marginHorizontal: 10,
  },
  iconStyle: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center'
  },
 
}

export default FullReservation;