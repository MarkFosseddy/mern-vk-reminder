import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { 
  LOGIN_USER, 
  LOGOUT_USER, 
  GET_ERRORS, 
  CLEAR_ERRORS 
} from './types';
import { setJwtToken, unsetJwtToken } from '../utils/jwtToken';

export const registerUser = (newUser, pageRedirect) => async dispatch => {
  try {
    await axios.post('api/users/register', newUser);
    pageRedirect.push('/login');

  } catch (err) {
    dispatch(clearErrors());
    dispatch({
      type: GET_ERRORS,
      errors: err.response.data
    });
  }
};

export const loginUser = (credentials, pageRedirect) => async dispatch => {
  try {
    const res = await axios.post('api/users/login', credentials);

    const { jwtToken } = res.data;
    localStorage.setItem('jwtToken', jwtToken);
    setJwtToken(jwtToken);

    const userData = jwtDecode(jwtToken);
    dispatch({
      type: LOGIN_USER,
      user: userData
    });

    pageRedirect.push('/dashboard');

  } catch (err) {
    dispatch(clearErrors());
    dispatch({
      type: GET_ERRORS,
      errors: err.response.data
    });
  } 
};

export const logoutUser = pageRedirect => dispatch => {
  localStorage.removeItem('jwtToken');

  unsetJwtToken();

  dispatch(clearErrors());
  dispatch({ type: LOGOUT_USER });

  pageRedirect.push('/login');
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
}
