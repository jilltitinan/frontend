import { AUTHEN } from '../actions/types';

const INITIAL_STATE = {
    result: {},
};

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case AUTHEN:
            return { ...state, result: actions.payload };
        default:
            return state;
    }
}