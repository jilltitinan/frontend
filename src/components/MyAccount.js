import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    ScrollView
} from 'react-native';
import { authen } from '../actions';
import { Button } from './common/Button';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AsyncStorage, localStorage } from 'react-native';


class MyAccount extends Component {
    state = { detail: {}, accountInformation: {},  refreshing: false, }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        const value = await AsyncStorage.getItem('token');
        await axios.post('https://celocker54.azurewebsites.net/api/Account/checkToken', {
            "_Token": value
        }).then(res => {
            if (res.status == 200) {
                const information = res.data
                this.setState({ accountInformation: information })
                { this.myAccout() }
                this.setState({ refreshing: false });
            }
            else {
                console.log("check token : broke")
            }
        })
            .catch(err => {
                console.log(err.res.data);
                Alert.alert(
                    err.res.data,
                    'Press ok to go back.',
                    [{ text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },],
                    { cancelable: false },
                );
            });
        this.setState({ refreshing: false });
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            console.log("Before axios useraccount    ", value)
            await axios.post('https://celocker54.azurewebsites.net/api/Account/checkToken', {
                "_Token": value
            }).then(res => {
                if (res.status == 200) {
                    const information = res.data
                    this.setState({ accountInformation: information })
                }
                else {
                    console.log("check token : broke")
                }
            })
                .catch(err => {
                    console.log(err.res.data);
                    Alert.alert(
                        err.res.data,
                        'Press ok to go back.',
                        [{ text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },],
                        { cancelable: false },
                    );
                });
        }
    }
    Logout() {
        console.log('logouttt   fdsfsad')
        AsyncStorage.clear('token');
        Actions.authen();
    }

    myAccout(){
        <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.state.accountInformation.name}</Text>
                    <Text style={styles.title}>Point : {this.state.accountInformation.point}</Text>
                </View>
                <View style={styles.inputWrapper1}>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.editaccount}>
                        <Text style={styles.text}>
                            Edit Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.termandcondition}>
                        <Text style={styles.text}>
                            Terms and Conditons
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.privacypolicy}>
                        <Text style={styles.text}>
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.setting}>
                        <Text style={styles.text}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <Button onPress={() => this.Logout()}>Log out</Button>
                </View>
            </View>
            </ScrollView>
    }

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
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.state.accountInformation.name}</Text>
                    <Text style={styles.title}>Point : {this.state.accountInformation.point}</Text>
                </View>
                <View style={styles.inputWrapper1}>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.editaccount}>
                        <Text style={styles.text}>
                            Edit Account
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.termandcondition}>
                        <Text style={styles.text}>
                            Terms and Conditons
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.privacypolicy}>
                        <Text style={styles.text}>
                            Privacy Policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.container2}
                        onPress={Actions.setting}>
                        <Text style={styles.text}>
                            Settings
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <Button onPress={() => this.Logout()}>Log out</Button>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    titleWrapper: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00A6A6',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
        paddingVertical: 5
    },
    wrapper: {
        marginTop: 30
    },
    inputWrapper1: {
        flex: 0.8,
        paddingVertical: 10,
        paddingHorizontal: 60,
    },
    inputLabel1: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800'
    },
    button: {
        marginBottom: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: '#3C6E71',
        borderColor: '#d6d7da',
        marginHorizontal: 50,
    },
    container2: {
        padding: 10,
        marginTop: 3,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#E3E3E3',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    text: {
        color: '#686868'
    }
});

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen })(MyAccount);