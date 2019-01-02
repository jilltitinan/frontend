import React, { Component } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const SwitchHome = (props) => {
   return (
       
      <View>
         <Switch
         onValueChange = {props.toggleSwitch1}
         value = {props.switch1Value}/>
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100
   }
});

export { SwitchHome };
