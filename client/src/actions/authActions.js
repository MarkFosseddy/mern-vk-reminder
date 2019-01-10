import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { LOGIN_USER, LOGOUT_USER, GET_ERRORS } from './types';
import { setJwtToken, unsetJwtToken } from '../utils/jwtToken';

export const registerUser = (newUser, pageRedirect) => (dispatch) => {
  axios
    .post('api/users/register', newUser)
    .then(() => pageRedirect.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      error: err.response.data.message,
    }));
};

export const loginUser = (credential, pageRedirect) => (dispatch) => {
  axios
    .post('api/users/login', credential)
    .then((res) => {
      const { jwtToken } = res.data;
      localStorage.setItem('jwtToken', jwtToken);

      setJwtToken(jwtToken);

      const userData = jwtDecode(jwtToken);
      dispatch({
        type: LOGIN_USER,
        user: userData,
      });

      pageRedirect.push('/dashboard');
    })
    .catch(err => console.error(err));
};

export const logoutUser = pageRedirect => (dispatch) => {
  localStorage.removeItem('jwtToken');

  unsetJwtToken();

  dispatch({
    type: LOGOUT_USER,
  });

  pageRedirect.push('/login');
};
