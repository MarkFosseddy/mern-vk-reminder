import axios from 'axios';

import { GET_REMINDERS, ADD_REMINDER } from './types';

export const getReminders = () => (dispatch) => {
  axios
    .get('api/reminders')
    .then(res => dispatch({
      type: GET_REMINDERS,
      reminders: res.data,
    }))
    .catch(err => console.log(err));
};

export const addReminder = newReminder => (dispatch) => {
  axios
    .post('/api/reminders', newReminder)
    .then(res => dispatch({
      type: ADD_REMINDER,
      newReminder: res.data,
    }))
    .catch(err => console.log(err));
};
