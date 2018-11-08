import React from 'react';
import { View } from 'react-native';

const Card = ({ children }) => (
    <View style={styles.containerStyle}>
        {children}
    </View>
);

const styles = {
    containerStyle: {
        margin: 20,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: 2,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2
    }
};

export { Card };
