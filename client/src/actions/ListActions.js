import {
  FETCH_LISTS,
  SAVE_LIST,
  DELETE_LIST,
  CREATE_LIST
} from './types';
import axios from 'axios';

export const fetchLists = () => async dispatch => {
  const res = await axios.get("/todo");

  dispatch({ type: FETCH_LISTS, payload: res });
}

export const saveList = (list) => async dispatch => {
  const res = await axios.post("/todo/save", list);

  dispatch({ type: FETCH_LISTS, payload: res });
}

export const fetchLists = () => async dispatch => {
  const res = await axios.put("/todo/create");

  dispatch({ type: FETCH_LISTS, payload: res });
}

export const fetchLists = (list) => async dispatch => {
  const res = await axios.psot("/todo/delete", list);

  dispatch({ type: FETCH_LISTS, payload: res });
}