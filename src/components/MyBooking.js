import React, { Component } from 'react';
import { View, StyleSheet, Dimensions,TouchableOpacity,Animated } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import { Constants } from 'expo';

const FirstRoutePending = () => (
    <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
  );
  const SecondRouteHistory = () => (
    <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
  );
  
  
class MyBooking extends Component {
    state = {
        index: 0,
        routes: [
          { key: 'first', title: 'Pending' },
          { key: 'second', title: 'History' },
        ],
      };
    
      _handleIndexChange = index => this.setState({ index });
    
      _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
    
        return (
          <View style={styles.tabBar}>
            {props.navigationState.routes.map((route, i) => {
              const color = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map(
                  inputIndex => (inputIndex === i ? '#00A6A6' : '#222')
                ),
              });
              return (
                <TouchableOpacity
                  style={styles.tabItem}
                  onPress={() => this.setState({ index: i })}>
                  {/* <Icon
                                name='home'
                                color='#00aced'
                                size={16} /> */}
                  <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      };
    
      _renderScene = SceneMap({
        first: FirstRoutePending,
        second: SecondRouteHistory,
      });
    
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
        return (
          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      tabBar: {
        flexDirection: 'row',
      },
      tabItem: {
        flex: 1, 
       
        alignItems: 'center',
       
        padding: 16,
      },
    });

export default MyBooking;