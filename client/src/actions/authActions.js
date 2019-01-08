import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { LOGIN_USER, LOGOUT_USER, GET_ERRORS } from './types';
import { setAuthToken, unsetAuthToken } from '../utils/authToken';

export const registerUser = newUser => dispatch => {
    axios.post('api/users/register', newUser)
        .then(() => console.log('user sent'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            error: err.response.data.message
        }));
};

export const loginUser = userData => dispatch => {
    axios.post('api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            setAuthToken(token);

            const userData = jwt_decode(token);
            dispatch({
                type: LOGIN_USER,
                user: userData
            });
        })
        .catch(err => console.error(err));
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    unsetAuthToken();
    dispatch({
        type: LOGOUT_USER
    });
};