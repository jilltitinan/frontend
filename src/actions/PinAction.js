import {PIN_ENTER } from './types';

export const pinEnter = ( pin ) => {
    return {
        type : PIN_ENTER,
        payload: { pin }
    }
}