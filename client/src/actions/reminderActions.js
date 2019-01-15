import axios from 'axios';

import {
  GET_REMINDERS,
  ADD_REMINDER,
  DELETE_REMINDER,
  UPDATE_REMINDER,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

export const getReminders = () => async dispatch => {
  try {
    const res = await axios.get('api/reminders');
    dispatch({
      type: GET_REMINDERS,
      reminders: res.data
    });

  } catch (err) {
    console.error(err);
  }
};

export const addReminder = newReminder => async dispatch => {
  try {
    const res = await axios.post('/api/reminders', newReminder)
    dispatch({
      type: ADD_REMINDER,
      newReminder: res.data,
    });

  } catch (err) {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({
      type: GET_ERRORS,
      errors: err.response.data
    });
  }
};

export const updateReminder = (id, updatedReminder) => async dispatch => {
  try {
    const res = await axios.put(`/api/reminders/${id}`, updatedReminder)
    dispatch({
      type: UPDATE_REMINDER,
      updatedReminder: res.data
    });

  } catch (err) {
    dispatch({ type: CLEAR_ERRORS });
    dispatch({
      type: GET_ERRORS,
      errors: err.response.data
    });
  }
};

export const deleteReminder = id => async dispatch => {
  try {
    await axios.delete(`/api/reminders/${id}`);
    dispatch({
      type: DELETE_REMINDER,
      id
    });

  } catch (err) {
    console.error(err);
  }
};