import { combineReducers } from 'redux';
import BookingDetailReducer from './BookingDetailReducer';
import ReservationReducer from './ReservationReducer';
import PinReducer from './PinReducer';
import AuthenReducer from './AuthenReducer';
import HistoryReducer from './HistoryReducer';

export default combineReducers({
    booking : BookingDetailReducer,
    reserve : ReservationReducer,
    pin : PinReducer,
    auth : AuthenReducer,
    past : HistoryReducer,
});