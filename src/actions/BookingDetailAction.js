import { BOOKING_SELECTED, BOOKING_ID } from './types';
import { Actions } from 'react-native-router-flux';


export const bookingSelected = (booking) => {
    console.log('resduvxx   ' + booking)
    return (dispatch) => {
        dispatch({
            type: BOOKING_SELECTED,
            payload: { booking }
        })
        Actions.bookdetail();
    }
};

