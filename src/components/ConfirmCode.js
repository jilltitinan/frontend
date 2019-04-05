import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { pinEnter, bookingSelected } from '../actions';
import CodeInput from './common/CodeInput';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class ComfirmCode extends Component {
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

    componentDidMount() {
        axios.get(`https://locker54.azurewebsites.net/web/ReserveDetail?id_reserve=${this.props.data.booking.bookingID}`)
            .then(res => {
                const info = res.data
                this.setState({ detail: info })
            })
    }


    onSavePress(bookingID) {
        axios.put(`https://locker54.azurewebsites.net/mobile/SetCode?id_reserve=${bookingID}&code=${this.props.pin.pin}`)
            .then(res => {
                if (res.status == 200) {
                    Alert.alert(
                        'Save code success',
                        'press ok',
                        [
                            { text: 'OK'},
                        ],
                        { cancelable: false },
                    );
                }

            })
            .catch(error => {
                Alert.alert(
                    'Reservation Failed',
                    error.response.data,
                    [
                        { text: 'OK', onPress: () => Actions.Reserve() },
                    ],
                    { cancelable: false },
                );
            })
    }

    render() {

        const { bookingID, startDate, endDate, location, size } = this.props.data.booking;

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Enter 6 Digit Number</Text>
                    </View>

                    <View style={styles.inputWrapper1}>
                        <CodeInput
                            ref="codeInputRef1"
                            className={'border-b'}
                            space={5}
                            size={40}
                            inputPosition='center'
                            onFulfill={(setcode) => this._onFulfill(setcode)}
                        />
                    </View>

                </View>
                <View style={styles.button}>
                    <Button onPress={() => this.onSavePress(bookingID)}>Save</Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
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


export default connect(mapStateToProps, { pinEnter, bookingSelected })(ComfirmCode);