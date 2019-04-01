import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Router, Scene, Actions, Tabs } from 'react-native-router-flux';
import { IconTab } from './common/IconTab';
import Login from './Login';
import Home from './Home';
import Reservation from './Reservation';
import MyBooking from './MyBooking';
import SumReservation from './SumReservation';
import BookingDetail from './BookingDetail';
import ConfirmCode from './ConfirmCode';
import Inbox from './Inbox';
import MyAccount from './MyAccount';
import MoreBookingDetail from './MoreBookingDetail';
import MoreHistoryDetail from './MoreHistoryDetail';
import Policy from './Policy';
import Term from './Term';
import EditAccount from './EditAccount';
import Setting from './Setting';
import Confirm from './Confirm';
import FullReservation from './FullReservation';
import testBase2 from './LockerFull';
import AfterBooked from './AfterBooked';
import ShowTheCode from './ShowTheCode';
import ShowNoCode from './ShowNoCode';

class RouterComponent extends React.Component {
    renderCustomButton() {
        return () => (
            <TouchableOpacity onPress={() => Actions.pop()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }

    renderGoHome() {
        return () => (
            <TouchableOpacity onPress={() => Actions.container()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }

    renderGoReservation() {
        return () => (
            <TouchableOpacity onPress={() => Actions.Reserve()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }
    render() {
        const { tabBarStyle } = styles;
        return (
            <Router navigationBarStyle={{ backgroundColor: '#00A6A6' }} titleStyle={{ color: "#FFF" }}>
                <Scene key="all" hideNavBar>
                    <Scene key="authen" >
                        <Scene key="login" component={MyBooking} title="Welcome" initial />
                    </Scene>

                    <Scene key="Reserve">
                        <Scene
                            key='reservePlace'
                            title='Reserve'
                            component={Reservation}
                            initial
                            renderLeftButton={this.renderGoHome()}
                        />
                    </Scene>

                    <Scene key="bookdetail" >
                        <Scene key="booking" component={MoreBookingDetail} title="Booking Detail" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="afterbooked" >
                        <Scene key="afterbook" component={AfterBooked} title="After book Detail" renderLeftButton={this.renderGoHome()} />
                    </Scene>


                    <Scene key="historydetail" >
                        <Scene key="historybooking" component={MoreHistoryDetail} title="History Detail" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="sumreserve" >
                        <Scene key="sumreserve" component={SumReservation} title="Summary" renderLeftButton={this.renderGoReservation()} />
                    </Scene>

                    <Scene key="editaccount" >
                        <Scene key="editac" component={EditAccount} title="Edit Account"
                            renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="showthecode" >
                        <Scene key="setcode" component={ShowTheCode} title="Show the code"
                            renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="shownocode" >
                        <Scene key="setnocode" component={ShowNoCode} title="Show the code"
                            renderLeftButton={this.renderCustomButton()} />
                    </Scene>


                    <Scene key="setting" >
                        <Scene key="set" component={Setting} title="Setting" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="privacypolicy" >
                        <Scene key="policy" component={Policy} title="Privacy Policy" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="termandcondition" >
                        <Scene key="term" component={Term} title="Term and Condition" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="fullreserve" >
                        <Scene key="fullreservation" component={FullReservation} title="full reserve" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="entercode" >
                        <Scene key="entercoderegister" component={ConfirmCode} title="Enter code" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key='container' hideNavBar>
                        <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={true}>
                            <Scene key='Home' icon={IconTab} iconName='home' labelStyle={{ color: 'red' }} initial>
                                <Scene
                                    key='home'
                                    component={Home}
                                    title='Home'
                                    initial
                                />
                            </Scene>

                            <Scene key='MyBooking' icon={IconTab} iconName='book'>
                                <Scene
                                    key='test1'
                                    component={MyBooking}
                                    title='My Booking'
                                >
                                </Scene>
                            </Scene>

                            <Scene key='Inbox' icon={IconTab} iconName='inbox'>
                                <Scene
                                    key='MainMenu3'
                                    component={Inbox}
                                    title='Inbox'
                                />
                            </Scene>

                            <Scene key='My Account' icon={IconTab} iconName='account'>
                                <Scene
                                    key='MainMenu4'
                                    component={MyAccount}
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
