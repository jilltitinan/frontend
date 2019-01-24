import React, { Component } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { Button } from './common/Button';

class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    render() {

        const {
            headerContentStyle,
            headerTextStyle,
            buttonNext,
            containerStyle,
            bottom,
        } = styles;

        return (
            <View
                style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}
            >
                <View style={containerStyle}>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>Phone Number</Text>
                        <TextInput
                            style={{ height: 40, }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            keyboardType='numeric'
                        />
                    </View>
                </View>
                <View style={bottom}>
                    <Button style={buttonNext}> Save </Button>
                </View>
            </View>
        );
    };

};

const styles = {
    headerContentStyle: {
        justifyContent: 'space-around',
    },
    headerTextStyle: {

        fontSize: 18,
        fontWeight: 'bold',
        color: '#6C6B6B',
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#3C6E71',
        marginHorizontal: 10,
    },
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    }

};

export default EditAccount;
