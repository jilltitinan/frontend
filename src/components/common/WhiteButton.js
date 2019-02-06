import React, { PropTypes } from 'react';
import { TouchableOpacity, Text, Actions } from 'react-native';

const WhiteButton = ({ children, onPress, style }) => {
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
        borderRadius: 10,
        borderColor: 'white',
        backgroundColor: 'white'
    },
    textStyle: {
        color: '#3C6E71',
        alignSelf: 'center',
        fontSize: 16
    }
};

export { WhiteButton };
