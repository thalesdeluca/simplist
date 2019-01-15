import axios from 'axios';
import { 
  FETCH_USER, 
  LOGIN_USER,
  LOGOUT_USER
} from './types';

export const fetchUser = () => async dispatch =>  {
  const res = await axios.get("/auth/user");
  
  dispatch({ type: FETCH_USER, payload: res.data });
}
export const loginUser = (email, pass) => async dispatch =>  {

  const res = await axios.post("/auth/login", {
    email: email,
    password: pass
  });
  dispatch({ type:LOGIN_USER, payload: res.data });
}
export const logoutUser = () => async dispatch =>  {
  await axios.get("/auth/logout");

  dispatch({ type:LOGOUT_USER, payload: null });
}