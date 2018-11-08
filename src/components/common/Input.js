import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, placeholder, secureTextEntry, onChangeText, value }) => {
    const { textLabel, textInput, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={textLabel}>{label}</Text>
            <TextInput 
                style={textInput}
                value={value}
                autoCorrect={false}
                autoCapitalize={'none'}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = {
    textLabel: {
        paddingLeft: 10,
        flex: 1
    },
    textInput: {
        flex: 2
    },
    containerStyle: {
        flex: 1,
        flexDirection: 'row'
    }
};

export { Input };
