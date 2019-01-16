import {
  FETCH_LISTS,
  SAVE_LIST,
  DELETE_LIST,
  CREATE_LIST
} from './types';
import axios from 'axios';

export const fetchLists = () => async dispatch => {
  const res = await axios.get("/todo/");
  
  dispatch({ type: FETCH_LISTS, payload: res.data });
}

export const saveList = (list) => async dispatch => {
  const res = await axios.put("/todo/save", list);

  dispatch({ type: SAVE_LIST, payload: res.data });
}

export const createList = () => async dispatch => {
  const res = await axios.post("/todo/create");

  dispatch({ type: CREATE_LIST, payload: res.data });
}

export const deleteList = (list) => async dispatch => {
  const res = await axios.post("/todo/delete", list);

  dispatch({ type: DELETE_LIST, payload: res.data });
}