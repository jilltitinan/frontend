import { HISTORY_SELECTED } from './types';
import { Actions } from 'react-native-router-flux';

export const historySelected = (past) => {
    console.log('resduvxx   ' + past)
    return (dispatch) => {
        dispatch({
            type: HISTORY_SELECTED,
            payload: { past }
        })
        Actions.historydetail();
    }
};

