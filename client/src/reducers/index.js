import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ListReducer from './ListReducer';

export default combineReducers({
  auth: AuthReducer,
  list: ListReducer
});