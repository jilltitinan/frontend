import { BOOKING_SELECTED } from '../actions/types';

const INITIAL_STATE = { 
    data: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case EMAIL_CHANGED:
        //     return { ...state, email: action.payload };
        case BOOKING_SELECTED:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};