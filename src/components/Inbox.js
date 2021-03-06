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
import InboxDetail from './InboxDetail';

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            reserve: [],
        }
    }

    onButtonPress(booking) {
        console.log("Inbox ", booking)
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        const value = await AsyncStorage.getItem('token');
        await axios.get(`https://celocker54.azurewebsites.net/mobile/UserInbox?id_account=${this.props.result.id_account}`,
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
        await axios.get(`https://celocker54.azurewebsites.net/mobile/UserInbox?id_account=${this.props.result.id_account}`,
            { headers: { "Authorization": `Bearer ${value}` } }
        )
            .then(response =>
                this.setState({ reserve: response.data })
            )
    }

    renderReserve() {

        return this.state.reserve.map(booking =>
            <TouchableOpacity onPress={() => this.onButtonPress(booking)} key={booking.id_noti}>
                <InboxDetail booking={booking} />
            </TouchableOpacity>
        );
    }

    render() {
        // console.log('AlbumList is ' + this.state);
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
                                name='forum'
                                color='#00A6A6'
                                size={80} />
                            <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                No Message
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

export default connect(mapStateToProps, { authen, bookingSelected })(Inbox);