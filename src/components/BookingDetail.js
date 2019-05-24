// albums/src/components/AlbumList.js
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import MoreBookingDetail from './MoreBookingDetail';
import { authen } from '../actions';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Actions } from 'react-native-router-flux';

class BookingDetail extends Component {
    state = { reserve: [] }



    componentWillMount() {
        axios.get(`https://celocker54.azurewebsites.net/api/Reservation/ReserveID?id_account=${this.props.result.id_account}`)
            .then(response => this.setState({ reserve: response.data })
        );
    }

    renderReserve() {
        return this.state.reserve.map(booking =>
            <MoreBookingDetail key={booking.id_reserve} booking={booking} />

        );
    }

    render() {
        console.log(this.state);

        return (
            <View style={{ flex: 1, }}>
                {this.renderReserve()}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen })(BookingDetail);