import axios from 'axios';

export const setJwtToken = jwtToken => {
	axios.defaults.headers.common['Authorization'] = jwtToken;
};

export const unsetJwtToken = () => {
	delete axios.defaults.headers.common['Authorization'];
};
