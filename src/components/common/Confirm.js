import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { CardSection } from './CardSectionAlbum';
import { Button } from './Button';

class Confirm extends React.Component {
    constructor() {
        super()
        this.state = {
            showMe: false
        }
    }

    render() {
        console.log(this.state.visible)
        return (
            <View style={{ flex: 1 }} >
                <Modal visible={this.state.showMe} onRequestClose={() => console.warn("this is close")} transparent animationType='fade'>
                    <View >
                        <TouchableOpacity onPress={() => this.setState({ showMe: false })}>
                            <Text>HELLO</Text>
                            {/* <Ionicons name="ios-close-circle" size={30} style={Styles.IconCloseLogin} /> */}
                        </TouchableOpacity>

                    </View>
                </Modal>
                <TouchableOpacity onPress={() => this.setState({ showMe: true })}>
                    <Text >เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>
        );
    }
};
export { Confirm };