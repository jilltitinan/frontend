import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';
import Card from './common/CardAlbum';
import CardSection from './common/CardSectionAlbum';
import Login from './Login';
import { connect } from 'react-redux';

class Inbox extends Component {


    state = { contents: [] }

    // componentWillMount() {
    //     axios.get('https://locker54.azurewebsites.net/api/Content/ContentId?id=1')
    //         .then(response => this.setState({ contents: response.data }));
    //         // console.log(contents);
    // }

    renderContents() {
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle
        } = styles;
        return this.state.contents.map(content =>
            <TouchableOpacity onPress={() => this.onButtonPress(content)} key={content.id_content}>
                <Card>
                    <CardSection>

                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>fdf</Text>
                            <Text>{content.plainText}</Text>
                        </View>
                        {/* <View style={thumbnailContainerStyle}>
                            <Text>{thumbnail_image}</Text>
                        </View> */}

                    </CardSection>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView>
                {this.renderContents()}
            </ScrollView>
        )
    }
}


const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};

export default Inbox;
