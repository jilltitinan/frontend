import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { authen, bookingSelected } from '../actions';
import MoreBookingDetail from './MoreBookingDetail';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import * as actions from '../actions';
import { empty } from 'rxjs/observable/empty';

class AlbumList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            reserve: [],
        }
    }

    onButtonPress(booking) {
        this.props.bookingSelected(booking);
        Actions.bookdetail();
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        const value = await AsyncStorage.getItem('token');
        await axios.get(`https://lockerce54.azurewebsites.net/mobile/Pending?id_account=${this.props.result.id_account}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response =>
                this.setState({ reserve: response.data })
        )
        { this.renderReserve() }
        this.setState({ refreshing: false });
    }

    componentWillMount = async () => {
        console.log("album list : ", this.props.result.id_account);
        const value = await AsyncStorage.getItem('token');
        await axios.get(`https://lockerce54.azurewebsites.net/mobile/Pending?id_account=${this.props.result.id_account}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response =>
                this.setState({ reserve: response.data })
            )
    }

    renderReserve() {

        return this.state.reserve.map(booking =>
            <TouchableOpacity onPress={() => this.onButtonPress(booking)} key={booking.bookingID}>
                <AlbumDetail booking={booking} />
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
                                name='more'
                                color='#00A6A6'
                                size={80} />
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                No Reservation
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

export default connect(mapStateToProps, { authen, bookingSelected })(AlbumList);