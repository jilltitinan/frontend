import { AUTHEN } from './types';
import { Actions } from 'react-native-router-flux';

export const authen = (result) => {

    console.log('reduxxxxxxxxxxx ' + result);

    return (dispatch) => {
        dispatch({
            type: AUTHEN,
            payload: result,
        })
        // Actions.container();
    }
}
