import { BOOKING_SELECTED } from './types';
import { Actions } from 'react-native-router-flux';

// export const bookingSelected = (album) => {
//     console.log(album)
//     return {
//         type: BOOKING_SELECTED,
//         payload: { album }

//     }
// }

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

