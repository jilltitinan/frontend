import React from 'react';
import { Router, Scene, Actions, Tabs } from 'react-native-router-flux';
import IconTab from './src/components/common/IconTab';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Reservation from './src/components/Reservation';

class RouterComponent extends React.Component {
    render() {
        const { tabBarStyle } = styles;
        return (
            <Router navigationBarStyle={{ backgroundColor: '#00A6A6'}}  titleStyle={{color : "#FFF"}}>
                <Scene key="all" hideNavBar>
                    <Scene >
                        <Scene key="login" component={Home} title="Welcome" initial />
                    </Scene>

                    <Scene key="Reserve">
                        <Scene
                            key='reservePlace'
                            title='Reserve'
                            onLeft={() => Actions.container()}
                            component={Reservation}
                            initial 
                        />
                    </Scene>

                    <Scene key='container' hideNavBar>
                        <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={true}>
                            <Scene key='Home' icon={IconTab} iconName='home' initial>
                                <Scene
                                    key='home'
                                    component={Home}
                                    title='Home'                                    
                                />
                            </Scene>

                            <Scene key='My Booking' icon={IconTab} iconName='book'>
                                <Scene
                                    key='test1'
                                    component={Login}
                                    title='My Booking'                                    
                                />
                            </Scene>

                            <Scene key='Inbox' icon={IconTab} iconName='inbox'>
                                <Scene
                                    key='MainMenu3'
                                    component={Login}
                                    title='Inbox'                                    
                                />
                            </Scene>

                            <Scene key='My Account' icon={IconTab} iconName='account'>
                                <Scene
                                    key='MainMenu4'
                                    component={Login}
                                    title='My Account'                                   
                                />
                            </Scene>
                        </Tabs>
                    </Scene>
                </Scene>
            </Router >
        );
    }
}

const styles = {
    tabBarStyle: {
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
    }
};

export default RouterComponent;
