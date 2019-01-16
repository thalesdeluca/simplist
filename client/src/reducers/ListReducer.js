import {
  FETCH_LISTS,
  CREATE_LIST,
  DELETE_LIST,
  SAVE_LIST
} from '../actions/types';

export default (state = null, action) => {
  switch(action.type){
    case FETCH_LISTS:
      return action.payload;
      
    case CREATE_LIST:
      return action.payload || false;

    case DELETE_LIST:
      return action.payload || false;

    case SAVE_LIST:
      return action.payload || false;
    
    default: 
      return state;
  }
}