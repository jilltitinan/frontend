import { RESERVATION_SIZE, RESERVATION_UPDATE, RESERVATION_START, RESERVATION_END, RESERVATION_HOUR, RESERVATION_STARTTIME, RESERVATION_TYPE } from '../actions/types';

const INITIAL_STATE = {
    location: 'ECC',
    size: 'S',
    date: '',
    endDate: '',
    hour: '2',
    time: '8:00',
    value: ''
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
        case RESERVATION_HOUR:
            return { ...state, hour: action.payload };
        case RESERVATION_STARTTIME:
            return { ...state, time: action.payload };
        case RESERVATION_TYPE:
            return { ...state, value: action.payload };
        default:
            return state;
    }
}