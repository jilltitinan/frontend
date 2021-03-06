import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { pinEnter, bookingSelected } from '../actions';
import CodeInput from './common/CodeInput';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


class ShowTheCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setcode2: '',
        };
    }

    _onFulfill(setcode) {
        this.setState({ setcode: setcode });
        this.props.pinEnter(setcode);
    }

    componentDidMount = async () => {
        const value = await AsyncStorage.getItem('token');
        axios.get(`https://celocker54.azurewebsites.net/mobile/GetCode?id_reserve=${this.props.data.booking.bookingID}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(res => {
                const info = res.data
                this.setState({ detail: info })
            })
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Your code is</Text>
                    </View>

                    <View style={styles.titleWrapper}>
                        <Text style={styles.title2}>{this.state.detail}</Text>
                    </View>

                </View>
                <View style={styles.button}>
                    <Button onPress={() => Actions.entercode()}>Edit</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    titleWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title: {
        color: '#7C7C7C',
        fontSize: 30,
        fontWeight: '800',
        paddingVertical: 30
    },
    title2: {
        color: '#7C7C7C',
        fontSize: 30,
        fontWeight: '100',
        paddingVertical: 30
    },
    wrapper: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    inputWrapper1: {
        paddingVertical: 50,
        paddingHorizontal: 20,
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
        borderColor: '#d6d7da',
        backgroundColor: '#3C6E71',
        marginHorizontal: 10,
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        marginHorizontal: 10,
        backgroundColor: '#3C6E71',
        elevation: 2,

    },
});

const mapStateToProps = (state) => {
    const { pin } = state.pin;
    const { data } = state.booking;
    return { pin, data };
};


export default connect(mapStateToProps, { pinEnter, bookingSelected })(ShowTheCode);