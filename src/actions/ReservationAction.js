import {
    RESERVATION_UPDATE,
    RESERVATION_SIZE,
    RESERVATION_START,
    RESERVATION_END,
    RESERVATION_STARTTIME,
    RESERVATION_HOUR,
    RESERVATION_TYPE,
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

export const reservationHour = (hour) => {
    return {
        type: RESERVATION_HOUR,
        payload: hour
    };
};

export const reservationStartTime = (time) => {
    return {
        type: RESERVATION_STARTTIME,
        payload: time
    };
};

export const reservationType = (value) => {
    return {
        type: RESERVATION_TYPE,
        payload: value
    };
};