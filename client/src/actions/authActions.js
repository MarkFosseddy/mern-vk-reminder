import axios from 'axios';

import { SET_CURRENT_USER, GET_ERRORS } from './types';

export const registerUser = newUser => dispatch => {
    axios.post('api/users/register', newUser)
        .then(() => console.log('user sent'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            error: err.response.data.message
        }));
};

// export const loginUser = userData => dispatch => {
//     axios.post('api/users/login', userData)
//         .then(res => console.log(res))
//         .catch(err => console.error(err));
// };