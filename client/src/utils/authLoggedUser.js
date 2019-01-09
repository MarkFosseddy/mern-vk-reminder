import jwt_decode from 'jwt-decode';

import { LOGIN_USER, LOGOUT_USER } from '../actions/types';
import { setJwtToken, unsetJwtToken } from './jwtToken';
import store from '../store';

export const authLoggedUser = jwtToken => {
	const userData = jwt_decode(jwtToken);

	const jwtTokenExpireTime = userData.exp;
	const currentTime = Date.now() / 1000;

	return currentTime < jwtTokenExpireTime 
		? loginUser(userData, jwtToken)
		: logoutUser()
};

const loginUser = (userData, jwtToken) => {
	store.dispatch({
		type: LOGIN_USER,
		user: userData
	});

	setJwtToken(jwtToken);
};

const logoutUser = () => {
	localStorage.removeItem('jwtToken');
	unsetJwtToken();

	store.dispatch({
		type: LOGOUT_USER
	});

	window.location.href = '/login';
};