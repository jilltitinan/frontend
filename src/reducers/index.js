import { combineReducers } from 'redux';
import BookingDetailReducer from './BookingDetailReducer';
import ReservationReducer from './ReservationReducer';
import PinReducer from './PinReducer';

export default combineReducers({
    booking : BookingDetailReducer,
    reserve : ReservationReducer,
    pin : PinReducer,
});