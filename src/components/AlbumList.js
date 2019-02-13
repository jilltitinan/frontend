import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import { bookingSelected } from '../actions';
import MoreBookingDetail from './MoreBookingDetail';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AlbumList extends Component {
    state = { albums: [] }

    // onEmailChange(text) {
    //     this.props.emailChanged(text);
    //     console.log('testtttt' + props);
    // }

    onButtonPress(album) {
        // const { title } = this.props;
        this.props.bookingSelected(album);
    }

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data }));
        // <MoreBookingDetail album={this.state.albums} />
    }

    renderAlbums() {
        
        return this.state.albums.map(album =>
            <TouchableOpacity onPress={() => this.onButtonPress(album)} key={album.title}>
                <AlbumDetail album={album} />
            </TouchableOpacity>
        );
    }

    render() {
        console.log('AlbumList is '+ this.state);
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

// const mapStateToProps = ({ booking }) => {
    
//         const { data } = booking;
 
//         return { data };
    
// };


export default connect(null, {bookingSelected})(AlbumList);