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
import Slideshow from 'react-native-image-slider-show';

const { width } = Dimensions.get('window');
const spaceWidth = (parseInt(width) - 260) / 3;



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null,
            dataSource: [
                { url: 'https://www.ihrsa.org/uploads/Articles/Column-Width/Legal_Active_Sports_Clubs_locker-room.jpg' },
                { url: 'https://i.ytimg.com/vi/B8SgEKMcPk4/maxresdefault.jpg' },
                { url: 'https://www.voucherpro.co.uk/blog/wp-content/uploads/2018/03/Footlocker-Promo-Code.png' },
            ],
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    componentWillMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
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
                    <Slideshow
                        dataSource={this.state.dataSource}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })}
                    />
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
                        <View >
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
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        justifyContent: 'space-between',
        paddingLeft: spaceWidth,
        paddingRight: spaceWidth,
    }
}

export default Home;
