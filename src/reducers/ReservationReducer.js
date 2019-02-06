import { RESERVATION_SIZE, RESERVATION_UPDATE, RESERVATION_START, RESERVATION_END } from '../actions/types';

const INITIAL_STATE = {
    location: ' ',
    size: ' ',
    date: ' ',
    endDate: ' ',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESERVATION_UPDATE:
            return { ...state, location: action.payload };
        case RESERVATION_SIZE:
            return { ...state, size: action.payload }; 
        case RESERVATION_START:
            return { ...state, date: action.payload };  
            case RESERVATION_END:
            return { ...state, endDate: action.payload };               
        default:
            return state;
    }
}