import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Router, Scene, Actions, Tabs, ActionConst, ActivityIndicator } from 'react-native-router-flux';
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
import { Permissions, Notifications } from 'expo';
import Waiting from './Waiting';


async function registerForPushNotificationsAsync(id_account) {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('ress router token ' + token);
    await Axios.post('https://celocker54.azurewebsites.net/api/Account/notitoken',
        {
            "id_account": id_account,
            "expoToken": token
        }).then(res => {
            console.log('ress ' + res);
            if (res.status == 200) {
                console.log('res dataa  ' + res.data);
            }
        })
        .catch(error => {
            Alert.alert(
                error.response.data,
                'Please try again.noti token',
                [{ text: 'OK' }],
                { cancelable: false },
            );
        })
}

class RouterComponent extends React.Component {

    state = { detail: [], accountInformation: {} }
    componentDidMount = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                console.log("Before axios useraccount    ", value)
                await Axios.post('https://celocker54.azurewebsites.net/api/Account/checkToken', {
                    "_Token": value
                }).then(res => {                    
                    if (res.status == 200) {
                        const information = res.data
                        this.setState({ accountInformation: information })
                    }
                    else {
                        console.log("check token : broke")
                    }
                })
                    .catch(err => {
                        console.log(err.res.data);
                        Alert.alert(
                            err.res.data,
                            'Press ok to go back. sfdafasdf',
                            [{ text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },],
                            { cancelable: false },
                        );
                    });
                console.log("Before UserAccount call")

                await Axios.get(`https://celocker54.azurewebsites.net/mobile/UserAccount?id_account=${this.state.accountInformation.id_account}`,
                    { headers: { "Authorization": `Bearer ${value}` } })
                    .then(response => {
                        const info = response.data
                        this.setState({ detail: info })
                        console.log("data from axios : ", this.state.detail)
                        if (response.status === 200) {
                            this.props.authen(this.state.detail);
                            registerForPushNotificationsAsync(this.state.accountInformation.id_account);
                            Actions.container();
                            console.log('status 200 at mobile/UserAccount');
                        }
                    })
                    .catch(err => {
                        console.log(err.response.data);
                        Alert.alert(
                            err.response.data,
                            'Press ok to go back. dfsf',
                            [{ text: 'OK', onPress: () => Actions.MyBooking(), style: 'cancel', },],
                            { cancelable: false },
                        );
                    });
            }
            else {
                Actions.authen();
            }
        } catch (error) {
            if (error.status === undefined) {
                console.log("errrrrr ", error.data)
                Actions.authen();
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

    renderGoBookingDetail() {
        return () => (
            <TouchableOpacity onPress={() => Actions.historydetail()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }

    renderGoSumReserve() {
        return () => (
            <TouchableOpacity onPress={() => Actions.sumreserve()}>
                <Icon name="arrow-back" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    }

    render() {
        const { tabBarStyle } = styles;
        return (
            <Router navigationBarStyle={{ backgroundColor: '#00A6A6' }} titleStyle={{ color: "#FFF" }}>
                <Scene key="all" hideNavBar>

                    <Scene key="waiting" hideNavBar type={ActionConst.RESET}>
                        <Scene key="waitingpage" component={Waiting} title="Welcome" />
                    </Scene>

                    <Scene key="authen" hideNavBar type={ActionConst.RESET}>
                        <Scene key="login" component={Login} title="Welcome" />
                    </Scene>

                    <Scene key="Reserve">
                        <Scene
                            key='reservePlace'
                            title='Search Locker'
                            component={Reservation}
                            initial
                            renderLeftButton={this.renderGoHome()}
                        />
                    </Scene>

                    <Scene key="bookdetail" >
                        <Scene key="booking" component={MoreBookingDetail} title="Booking Detail" renderLeftButton={this.renderGoHistory()} />
                    </Scene>

                    <Scene key="afterbooked" >
                        <Scene key="afterbook" component={AfterBooked} title="Booking Detail" renderLeftButton={this.renderGoHistory()} />
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
                        <Scene key="fullreservation" component={FullReservation} title="Reservation" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key="entercode" >
                        <Scene key="entercoderegister" component={ConfirmCode} title="Setting code" renderLeftButton={this.renderCustomButton()} />
                    </Scene>

                    <Scene key='container' hideNavBar type={ActionConst.RESET}>
                        <Tabs key='tabber' tabBarStyle={tabBarStyle} showLabel={true} labelStyle={{ color: '#3C6E71' }}>
                            <Scene key='Home' icon={IconTab} iconName='home' >
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

                            <Scene key='MyAccount' icon={IconTab} iconName='account'>
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
