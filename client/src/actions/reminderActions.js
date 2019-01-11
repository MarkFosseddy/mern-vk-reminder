import axios from 'axios';

import { 
  GET_REMINDERS,
  ADD_REMINDER, 
  DELETE_REMINDER, 
  UPDATE_REMINDER 
} from './types';

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

export const deleteReminder = id => dispatch => {
  axios
    .delete(`/api/reminders/${id}`)
    .then(() => dispatch({
      type: DELETE_REMINDER,
      id
    }))
    .catch(err => console.log(err));
};

export const updateReminder = (id, updatedReminder) => dispatch => {
  axios
    .put(`/api/reminders/${id}`, updatedReminder)
    .then(res => dispatch({
      type: UPDATE_REMINDER,
      updatedReminder: res.data
    }))
    .catch(err => console.log(err));
};