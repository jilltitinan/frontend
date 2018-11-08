import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const HomeButton = ({ children, onPress }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Icon
                name='home'
                color='#00aced'
                size={40} />
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
        borderColor: '#C8CBCD',
        backgroundColor: '#FFFFFF'
    },
    textStyle: {
        color: '#00A6A6',
        alignSelf: 'center',
        fontSize: 16
    }
};

export { HomeButton };
