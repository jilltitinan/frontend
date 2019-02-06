import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import { pinEnter } from '../actions';
import CodeInput from './common/CodeInput';
import { Button } from './common/Button';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class ComfirmCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: ''
        };
    }

    _onFulfill(code) {
        // TODO: call API to check code here
        // If code does not match, clear input with: this.refs.codeInputRef1.clear()
        // if (code == '222222') {
        //     Alert.alert(
        //         'Confirmation Code',
        //         'Successful!',
        //         [{ text: 'OK' }],
        //         { cancelable: false }
        //     );
        // } else {
        //     Alert.alert(
        //         'Confirmation Code',
        //         'Code not match!',
        //         [{ text: 'OK' }],
        //         { cancelable: false }
        //     );

        //     this.refs.codeInputRef1.clear();
        // }
        console.log(code)
        this.setState({ code: code});
        this.props.pinEnter(code);
    }

    // _onFinishCheckingCode1(isValid) {
    //     console.log(isValid);
    //     if (!isValid) {
    //         Alert.alert(
    //             'Confirmation Code',
    //             'Code not match!',
    //             [{ text: 'OK' }],
    //             { cancelable: false }
    //         );
    //     } else {
    //         Alert.alert(
    //             'Confirmation Code',
    //             'Successful!',
    //             [{ text: 'OK' }],
    //             { cancelable: false }
    //         );
    //     }
    // }

    // _onFinishCheckingCode2(isValid, code) {
    //     console.log(isValid);
    //     if (!isValid) {
    //         Alert.alert(
    //             'Confirmation Code',
    //             'Code not match!',
    //             [{ text: 'OK' }],
    //             { cancelable: false }
    //         );
    //     } else {
    //         this.setState({ code });
    //         Alert.alert(
    //             'Confirmation Code',
    //             'Successful!',
    //             [{ text: 'OK' }],
    //             { cancelable: false }
    //         );
    //     }
    // }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Enter 6 Digit Number</Text>
                    </View>

                    <View style={styles.inputWrapper1}> 
                        <CodeInput
                            ref="codeInputRef1"
                            className={'border-b'}
                            space={5}
                            size={40}
                            inputPosition='center'
                            onFulfill={(code) => this._onFulfill(code)}
                        />
                    </View>
                   
                    
                </View>
                <View style={styles.button}>
                        <Button onPress={Actions.reserve}>Save</Button>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    titleWrapper: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title: {
        color: '#7C7C7C',
        fontSize: 30,
        fontWeight: '800',
        paddingVertical: 30
    },
    wrapper: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
    },
    inputWrapper1: {
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
   
    inputLabel1: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800'
    },
    button: {
        marginBottom: 15,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        marginHorizontal: 10,
    }
    
});

const mapStateToProps = (state) => {
    // console.log("before mapstateToProps   "+ state.reserve);
    const { pin } = state.pin;
    // console.log("after  "+ l2 + "  "+ s2);
    return { pin };
};


export default connect(mapStateToProps, { pinEnter }) (ComfirmCode);