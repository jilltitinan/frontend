import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button } from './common/Button';
import { WhiteButton } from './common/WhiteButton';
import { Icon } from 'react-native-elements';

class FullReservation extends Component {
  componentWillMount() {
    const { width } = Dimensions.get('window');
    // Responsive Condition
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
    const { bottom, buttonNext, iconStyle,textStyle } = styles;
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
          {/* <Button style={buttonNext}}>  </Button> */}
          <WhiteButton style={buttonNext} > Change Location </WhiteButton>
          <Button style={buttonNext} > Change Date </Button>
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
  },
  iconStyle: {
    flex: 0.8,
    padding: 120,
    // justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
 
}

export default FullReservation;