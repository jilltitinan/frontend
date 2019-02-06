import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { CardSection } from './common/CardSectionAlbum';
import { Button } from './common/Button';
import { Icon } from 'react-native-elements';
import { bookingSelected } from '../actions';
import { connect } from 'react-redux';

class Confirm extends React.Component {
    constructor() {
        super()
        this.state = {
            showMe: false
        }
    }

    render() {
        const { buttonStyle, textStyle, modalStyle, inModalStyle } = styles;
        const style = this.props.style;
        const children = this.props.children;

        console.log(this.state.visible)
        return (
            <View >
                <View >
                    <Modal visible={this.state.showMe} onRequestClose={() => console.warn("this is close")} transparent animationType='fade'>
                        <View style={modalStyle} >

                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                padding: 5,
                                marginHorizontal: 50,
                                marginVertical: 225,

                            }}>
                                <Text style={{ fontSize: 18 }}>Are you sure to cancle this locker?</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <Button style={{backgroundColor: '#3C6E71'}} > Yes </Button>
                                    <Button  style={{backgroundColor: '#3C6E71'}} onPress={() => this.setState({ showMe: false })}> No </Button>
                                </View>

                            </View>
                        </View>

                    </Modal>
                </View>

                <TouchableOpacity onPress={() => this.setState({ showMe: true })} style={{ ...buttonStyle, ...style }}>
                    <Text style={textStyle}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const mapStateToProps = ({ booking }) => {
    const { data } = booking;
    return { data };
};


const styles = {
    buttonStyle: {
        // flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 10,
        // borderWidth: 1,
        elevation: 2,
        // borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF'
    },
    textStyle: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 16
    },
    modalStyle: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
    },
    inModalStyle: {
        width: '90%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: 'white',
        elevation: 20,
        padding: 10,
        borderRadius: 4,
    }
};
export default connect(mapStateToProps, { bookingSelected })(Confirm);