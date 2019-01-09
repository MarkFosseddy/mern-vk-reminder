import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { LOGIN_USER, LOGOUT_USER, GET_ERRORS } from './types';
import { setAuthToken, unsetAuthToken } from '../utils/authToken';

export const registerUser = (newUser, pageRedirect) => dispatch => {
	axios
		.post('api/users/register', newUser)
		.then(() => pageRedirect.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				error: err.response.data.message
			})
		);
};

export const loginUser = (credential, pageRedirect) => dispatch => {
	axios
		.post('api/users/login', credential)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);

			setAuthToken(token);

			const userData = jwt_decode(token);
			dispatch({
				type: LOGIN_USER,
				user: userData
			});

			pageRedirect.push('/dashboard');
		})
		.catch(err => console.error(err));
};

export const logoutUser = pageRedirect => dispatch => {
	localStorage.removeItem('jwtToken');

	unsetAuthToken();

	dispatch({
		type: LOGOUT_USER
	});

	pageRedirect.push('/login');
};
