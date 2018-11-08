import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => (
    <View style={[styles.containerStyle, style]}>
        {children}
    </View>
);

const styles = {
    containerStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#000',
        flexDirection: 'row',
        position: 'relative'
    }
};

export { CardSection };
