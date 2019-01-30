import {
  GET_REMINDERS,
  ADD_REMINDER,
  DELETE_REMINDER
} from '../actions/types';

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

    case DELETE_REMINDER:
      const reminders =
        state.reminders.filter(reminder => reminder._id !== action.id);
      return {
        ...state,
        reminders
      };

    default:
      return state;
  }
};

export default reminderReducer;
