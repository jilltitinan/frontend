// albums/src/components/AlbumList.js
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import MoreBookingDetail from './MoreBookingDetail';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';

class AlbumList extends Component {
    state = { albums: [] }

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data }));
        <MoreBookingDetail album={this.state.albums} />
    }


    renderAlbums() {
        return this.state.albums.map(album =>
            <TouchableOpacity onPress={Actions.bookdetail} key={album.title}>
                <AlbumDetail album={album} />
            </TouchableOpacity>
        );
    }

    render() {
        // console.log(this.state);

        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

export default AlbumList;