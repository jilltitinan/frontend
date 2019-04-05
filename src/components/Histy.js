import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import HistoryDetail from './HistoryDetail';
import HistoryList from './HistoryList';
import { authen, bookingSelected, historySelected } from '../actions';
import { connect } from 'react-redux';

class Histy extends Component {


    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            reserve: [],
        }
    }

    onButtonPress(booking) {
        // const { title } = this.props;
        console.log('booking ' + booking)
        this.props.historySelected(booking);
    }
    _onRefresh = () => {
        this.setState({ refreshing: true });
        { this.renderReserve() }
        this.setState({ refreshing: false });
    }

    componentWillMount() {
        axios.get('https://locker54.azurewebsites.net/mobile/Pending?id_account=58010326')
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
        // console.log('History');

        return this.state.reserve.map(booking =>
            <TouchableOpacity onPress={() => this.onButtonPress(booking)} key={booking.bookingID}>
                <HistoryList booking={booking} />
            </TouchableOpacity>
        );
    }

    render() {
        // console.log('history is ' + this.state);
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }>
                {this.renderReserve()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { result } = state.auth;
    return { result };
}

export default connect(mapStateToProps, { authen, historySelected })(Histy);