import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { SocialIcon } from 'react-native-elements';
import { Constants } from 'expo';
import AlbumList from './AlbumList';
import History5 from './Histy';

const FirstRoutePending = () => (
  <View style={[styles.container]} >
    <AlbumList />
  </View>
);
const SecondRouteHistory = () => (
  <History5 />
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
    const { iconName, focused } = this.props;
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
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}
            >
              <View style={{flexDirection: 'row',}}>
                <Icon
                  name={this.state.index === i ? 'folder' : 'folder-open'} 
                  iconStyle={{ paddingRight : 5}}
                  color= {this.state.index === i ? '#00A6A6' : '#222'} 
                  size={15} />
    
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </View>
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 16,
  },
});

export default MyBooking;