import React from 'react';

import ReminderItem from './ReminderItem';

import { ListGroup } from 'reactstrap';

const ReminderList = ({ reminders }) => (
  <ListGroup>
    {
      reminders.map(reminder => (
        <ReminderItem
          key={ reminder._id }
          reminder={ reminder }
        />
      ))
    }
  </ListGroup>
);

export default ReminderList;
