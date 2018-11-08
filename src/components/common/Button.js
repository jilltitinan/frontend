import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ children, onPress }) => {
    const { buttonStyle, textStyle } = styles;

    return(
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#00A6A6',
        backgroundColor: '#00A6A6'
    },
    textStyle: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 16
    }
};

export { Button };
