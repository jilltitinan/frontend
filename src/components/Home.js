import React, { Component } from 'react';
import { View, Image, Dimensions, TouchableHighlight, TouchableOpacity, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { HomeButton } from './common/HomeButton';
import { Card } from './common/Card';
import { Color, GREEN, GRAY } from './common/color';
import { IconTab } from './common/IconTab';
import { CardSection } from './common/CardSection';
import { Slick } from './common/Slick';
import { SlickItem } from './common/SlickItem';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';


class Home extends Component {
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
        const { container, button } = styles;
        const { size } = this.state;
        return (
            <View style={container}>
                <Card>
                    <Image
                        style={{ width: 200, height: 200 }}
                        source={require('/frontend/src/components/image/dog1.jpg')}
                    />
                    {/* <Card>
                    <Slick>
                        <SlickItem source={require('/frontend/src/components/image/dog1.jpg')} />
                        <SlickItem source={require('/frontend/src/components/image/dog1.jpg')} />
                        <SlickItem source={require('/frontend/src/components/image/dog1.jpg')} />
                    </Slick>
                </Card> */}
                </Card>
                <Card>
                    <View style={button}>
                        <View>
                            <TouchableOpacity onPress={Actions.Reserve}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 130,
                                    height: 130,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,

                                }}  >
                                <Icon name={"spa"} size={40} color={GRAY} />
                                <Text style={{ fontWeight: 'bold', color: GREEN, fontSize: 20 }}> Reservation</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 130,
                                    height: 130,
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                }}                    >
                                <Icon name={"snooze"} size={40} color={GRAY} />
                                <Text style={{ fontWeight: 'bold', color: GREEN, fontSize: 20 }}> Promotion </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>

            </View>
        );
    }
}

const styles = {
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start'
    },
    button: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
    }
}

export default Home;
