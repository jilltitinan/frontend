import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, Actions } from 'react-native';

const Button = ({ children, onPress, style }) => {
    const { buttonStyle, textStyle } = styles;

    return(
        <TouchableOpacity onPress={onPress} style={{ ...buttonStyle, ...style }}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};


const styles = {
    buttonStyle: {
        // flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#3C6E71',
        backgroundColor: '#3C6E71'
    },
    textStyle: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 16
    }
};

export { Button };
