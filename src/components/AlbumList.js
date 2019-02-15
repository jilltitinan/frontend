import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { authen, bookingSelected } from '../actions';
import MoreBookingDetail from './MoreBookingDetail';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AlbumList extends Component {
    state = { reserve: [] }

    // onEmailChange(text) {
    //     this.props.emailChanged(text);
    //     console.log('testtttt' + props);
    // }

    onButtonPress(booking) {
        // const { title } = this.props;
        console.log('booking ' + booking)
        this.props.bookingSelected(booking);
    }

    componentWillMount() {
        axios.get('https://locker54.azurewebsites.net/api/Reservation/ReserveID?id=111754653601874456461')
            .then(response =>
                this.setState({ reserve: response.data })
            )
        //     .catch (function (error) {
        //     if (error.response) {
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //         console.log(error.response.headers);
        //     }
        // });

    }

    renderReserve() {

        return this.state.reserve.map(booking =>
            <TouchableOpacity onPress={() => this.onButtonPress(booking)} key={booking.id_reserve}>
                <AlbumDetail booking={booking} />
            </TouchableOpacity>
        );
    }

    render() {
        console.log('AlbumList is ' + this.state);
        return (
            <ScrollView>
                {this.renderReserve()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen, bookingSelected  })(AlbumList);