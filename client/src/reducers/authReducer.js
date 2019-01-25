import { LOGIN_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };

    default:
      return state;
  }
};

export default authReducer;
