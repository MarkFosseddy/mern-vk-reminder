import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  errors: []
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.errors
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      };

    default:
      return state;
  }
};

export default errorReducer;
