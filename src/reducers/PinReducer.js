import { PIN_ENTER } from '../actions/types';

const INITIAL_STATE = {
    pin: ' '
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PIN_ENTER:
            return { ...state, pin: action.payload };
        default:
            return state;
    }
}