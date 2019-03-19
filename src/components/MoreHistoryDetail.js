import React, { PropTypes, Component } from 'react';
import { Text, View, Image, Actions } from 'react-native';
import { Icon } from 'react-native-elements';
import { historySelected } from '../actions';
import { connect } from 'react-redux';
import { Button } from './common/Button';


class MoreHistoryDetail extends Component {
    render() {

        const { bookingID, startDate, endDate, location, size } = this.props.data.past;
        const {
            headerContentStyle,
            headerTextStyle,
            buttonNext,
            containerStyle,
            bottom,
            buttonCancle,
        } = styles;

        return (

            <View
                style={{
                    marginHorizontal: 10,
                    marginTop: 10,
                    flex: 1,
                }}
            >
                <View style={containerStyle}>
                    <View style={headerContentStyle}>
                        {/* <Text style={headerTextStyle}>{id_reserve}</Text> */}
                        <Text>{size}</Text>
                        <Text>{startDate}</Text>
                        <Icon
                            name='launch'
                            color='#909395'
                            size={120}
                        />
                    </View>
                </View>
                <View style={bottom}>
                    {/* <Button style={buttonNext}}>  </Button> */}

                    <Button style={buttonNext} > Show the code </Button>
                </View>

            </View>
        );
    }
};

const mapStateToProps = ({ past }) => {
    const { data } = past;
    return { data };
};


const styles = {
    headerContentStyle: {
        justifyContent: 'space-around',
    },
    headerTextStyle: {
        fontSize: 18
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    buttonNext: {
        marginBottom: 15,
        borderRadius: 4,
        marginHorizontal: 10,
        backgroundColor: '#3C6E71',
        elevation: 2,

    },
    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },


};


export default connect(mapStateToProps, { historySelected })(MoreHistoryDetail);