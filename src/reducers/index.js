import { combineReducers } from 'redux';
import BookingDetailReducer from './BookingDetailReducer';

export default combineReducers({
    booking : BookingDetailReducer
})