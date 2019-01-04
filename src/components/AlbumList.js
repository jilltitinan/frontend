// albums/src/components/AlbumList.js
import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { Actions } from 'react-native-router-flux';

class AlbumList extends Component {
    state = { albums: [] }

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data }));
    }

    renderAlbums() {
        return this.state.albums.map(album =>
            <AlbumDetail key={album.title} album={album} />
        );
    }

    render() {
        console.log(this.state);
        
        return (
            <TouchableOpacity onPress={Actions.bookdetail}>
                <ScrollView>
                    {this.renderAlbums()}
                </ScrollView>
            </TouchableOpacity>
        );
    }
}

export default AlbumList;