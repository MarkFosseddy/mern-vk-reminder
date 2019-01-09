import { GET_REMINDERS, ADD_REMINDER } from '../actions/types';

const initialState = {
	reminders: []
};

const reminderReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REMINDERS:
			return {
				...state,
				reminders: action.reminders
			};

		case ADD_REMINDER:
			return {
				...state,
				reminders: [action.newReminder, ...state.reminders]
			};

		default:
			return state;
	}
};

export default reminderReducer;
