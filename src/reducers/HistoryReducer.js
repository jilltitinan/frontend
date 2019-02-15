import { HISTORY_SELECTED } from '../actions/types';

const INITIAL_STATE = { 
    data: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HISTORY_SELECTED:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};