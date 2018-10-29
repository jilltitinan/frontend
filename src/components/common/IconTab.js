import React from 'react';
import { Icon } from 'react-native-elements';
import { ORANGE, PINK } from './color';

class IconTab extends React.Component {
    render() {
        const { iconName, focused } = this.props;
        return (
            <Icon 
                name={iconName} 
                type='material-community' 
                size={20} 
                color={focused ? PINK : 'black'} 
            />
        );
    }
}

export { IconTab };
