import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import HistoryDetail from './HistoryDetail';
import HistoryList from './HistoryList';
import { authen, bookingSelected, historySelected } from '../actions';
import { connect } from 'react-redux';

class Histy extends Component {
    state = { reserve: [] }

    // onEmailChange(text) {
    //     this.props.emailChanged(text);
    //     console.log('testtttt' + props);
    // }

    onButtonPress(booking) {
        // const { title } = this.props;
        console.log('booking ' + booking)
        this.props.historySelected(booking);
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
        console.log('History');

        return this.state.reserve.map(booking =>
            <TouchableOpacity onPress={() => this.onButtonPress(booking)} key={booking.id_reserve}>                
                <HistoryList booking={booking} />
            </TouchableOpacity>
        );
    }

    render() {
        console.log('history is ' + this.state);
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

export default connect(mapStateToProps, { authen, historySelected  })(Histy);