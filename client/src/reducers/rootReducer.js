import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import reminderReducer from './reminderReducer';

export default combineReducers({
	auth: authReducer,
	reminder: reminderReducer,
	error: errorReducer,
});
