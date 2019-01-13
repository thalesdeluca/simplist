import axios from 'axios';
import { 
  FETCH_USER, 
  LOGIN_USER,
  LOGOUT_USER
} from './types';

export const fetchUser = () => async dispatch =>  {
  const res = await axios.get("/auth/user");

  console.log(res);
}