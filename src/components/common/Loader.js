import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class Loader extends React.Component {

  render() {
    return (
      <View style ={{ justifyContent:'center', alignItems: 'center', backgroundColor:'#ffffff', flex: 1}}>
        <Image
          style={{ width: 217.5, height: 298 }}
          source={require('/frontend/src/components/image/lockerGif.gif')}
        />
      </View>
    );
  }
}
