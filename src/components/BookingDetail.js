// albums/src/components/AlbumList.js
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import MoreBookingDetail from './MoreBookingDetail';
import { Actions } from 'react-native-router-flux';

class BookingDetail extends Component {
    state = { albums: [] }

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data }));
    }

    renderAlbums() {
        return this.state.albums.map(album =>
            <MoreBookingDetail key={album.title} album={album} />
            
        );
    }

    render() {
        console.log(this.state);
        
        return (
            <View style={{ flex: 1, }}>
                 {this.renderAlbums()}
            </View>              
        );
    }
}

export default BookingDetail;