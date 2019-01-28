import { BOOKING_SELECTED } from './types';
import { Actions } from 'react-native-router-flux';

// export const bookingSelected = (album) => {
//     console.log(album)
//     return {
//         type: BOOKING_SELECTED,
//         payload: { album }

//     }
// }

export const bookingSelected = (album) => {
    console.log('resduvxx   ' + album)
    return (dispatch) => {
        dispatch({
            type: BOOKING_SELECTED,
            payload: { album }
        })
        Actions.bookdetail();
    }
};

