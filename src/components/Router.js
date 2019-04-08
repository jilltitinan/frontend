import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Router, Scene, Actions, Tabs } from 'react-native-router-flux';
import { authen } from '../actions';
import { connect } from 'react-redux';
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
import AfterBooked from './AfterBooked';
import ShowTheCode from './ShowTheCode';
import ShowNoCode from './ShowNoCode';
import { AsyncStorage } from 'react-native';
import Axios from 'axios';


class RouterComponent extends React.Component {

    state = { detail: [], accountInformation: {} }
    componentDidMount = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log("Before axios useraccount    ", value)
                await Axios.post('https://locker54.azurewebsites.net/api/Account/checkToken', {
                    "_Token": value
                }).then(res => {
                    if (res.status == 200) {
                        const information = res.data
                        this.setState({ accountInformation: information })
                        // console.log("check token :  ", this.state.accountInformation)
                    }
                    else {
                        console.log("check token : broke")
                    }
                })
                .catch(err => {
                    console.log(err.response.data);
                    Alert.alert(
                        err.response.data,
                        'Press ok to go back.',
                        [
                            { text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },

                        ],
                        { cancelable: false },
                    );
                });
                console.log("Before UserAccount call")
            
                await Axios.get(`https://locker54.azurewebsites.net/mobile/UserAccount?id_account=${this.state.accountInformation.id_account}`,
                    { headers: { "Authorization": `Bearer ${value}` } })
                    .then(response => {
                        const info = response.data
                        this.setState({ detail: info })
                        console.log("data from axios : ", this.state.detail)
                        if (response.status === 200) {
                            this.props.authen(this.state.detail);
                            Actions.container();
                            console.log('status 200 at mobile/UserAccount');
                        }
                    })
                    .catch(err => {
                        console.log(err.response.data);
                        Alert.alert(
                            err.response.data,
                            'Press ok to go back.',
                            [
                                { text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },

                            ],
                            { cancelable: false },
                        );
                    });

            }
            // Actions.container();

            else {
                Actions.authen();
            }
        } catch (error) {
            if (error.status === undefined) {

                console.log("errrrrr ", error.data)

            } else {
                console.log("hello error  ")
                Actions.authen();
            }


        }
    };


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

    renderGoHistory() {
        return () => (
            <TouchableOpacity onPress={() => Actions.MyBooking()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }

    render() {
        const { tabBarStyle } = styles;
        return (
            <Router navigationBarStyle={{ backgroundColor: '#00A6A6' }} titleStyle={{ color: "#FFF" }}>
                <Scene key="all" hideNavBar>
                    <Scene key="authen" hideNavBar>
                        <Scene key="login" component={Login} title="Welcome" initial />
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
                        <Scene key="historybooking" component={MoreHistoryDetail} title="History Detail" renderLeftButton={this.renderGoHistory()} />
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
                        <Scene key="setnocode" component={ShowNoCode} title="Show NO code"
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

export default connect(null, { authen })(RouterComponent);
