import {
    RESERVATION_UPDATE,
    RESERVATION_SIZE,
    RESERVATION_START,
    RESERVATION_END,
} from './types';
import { Actions } from 'react-native-router-flux';

export const reservationUpdate = (location) => {
    // console.log("upadte " + prop + " update  " + value);
    // console.log(location)
    return {
        type: RESERVATION_UPDATE,
        payload: location
    };
};

export const reservationSize = (size) => {
    return {
        type: RESERVATION_SIZE,
        payload: size
    };
};

export const reservationStart = (date) => {
    return {
        type: RESERVATION_START,
        payload: date
    };
};

export const reservationEnd = (endDate) => {
    return {
        type: RESERVATION_END,
        payload: endDate
    };
};
