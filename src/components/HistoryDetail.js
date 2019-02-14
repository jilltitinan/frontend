import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import MoreHistoryDetail from './MoreHistoryDetail';
import { authen } from '../actions';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Actions } from 'react-native-router-flux';

class HistoryDetail extends Component {
    state = { reserve: [] }   

    componentWillMount() {
        axios.get(`https://locker54.azurewebsites.net/api/Reservation/Pending?id=${this.props.result.user.id}`)
            .then(response => this.setState({ reserve: response.data }));
    }

    renderReserve() {
        return this.state.reserve.map(booking =>
            <MoreHistoryDetail key={booking.id_reserve} booking={booking} />            

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

export default connect(mapStateToProps, { authen })(HistoryDetail);