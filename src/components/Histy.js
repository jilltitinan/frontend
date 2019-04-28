import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import HistoryDetail from './HistoryDetail';
import HistoryList from './HistoryList';
import { authen, bookingSelected, historySelected } from '../actions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Histy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            reserve: [],
        }
    }

    onButtonPress(booking) {
        this.props.historySelected(booking);
        Actions.historydetail();
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        const value = await AsyncStorage.getItem('token');

        axios.get(`https://lockerce54.azurewebsites.net/mobile/History?id_account=${this.props.result.id_account}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response =>
                this.setState({ reserve: response.data })
            )
        { this.renderReserve() }
        this.setState({ refreshing: false });
    }

    componentWillMount = async () => {
        const value = await AsyncStorage.getItem('token');

        axios.get(`https://lockerce54.azurewebsites.net/mobile/History?id_account=${this.props.result.id_account}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response =>
                this.setState({ reserve: response.data })
            )
            .catch(err => {
                Alert.alert(
                    err.response.data,
                    'Press ok to go back.',
                    [
                        { text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },
                    ],
                    { cancelable: false },
                );
            });

    }

    renderReserve() {
        return this.state.reserve.map(booking =>
            <TouchableOpacity onPress={() => this.onButtonPress(booking)} key={booking.bookingID}>
                <HistoryList booking={booking} />
            </TouchableOpacity>
        );
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
                {this.state.reserve.length != 0 && this.renderReserve()}
                {this.state.reserve.length === 0 &&
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 0.8, padding: 120, }}>
                            <Icon
                                name='contacts'
                                color='#00A6A6'
                                size={80} />
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                No History
                            </Text>
                        </View>
                    </View>}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen, historySelected })(Histy);