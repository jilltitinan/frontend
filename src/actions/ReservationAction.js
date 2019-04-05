import {
    RESERVATION_UPDATE,
    RESERVATION_SIZE,
    RESERVATION_START,
    RESERVATION_END,
    RESERVATION_STARTTIME,
    RESERVATION_HOUR,
    RESERVATION_TYPE,
    RESERVATION_ID,
} from './types';
import { Actions } from 'react-native-router-flux';


export const reservationUpdate = (location) => {
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

export const reservationType = (valueType) => {
    return {
        type: RESERVATION_TYPE,
        payload: valueType        
    };
   
};

export const reservationId = (id) => {
    return {
        type: RESERVATION_ID,
        payload: id
    };
};