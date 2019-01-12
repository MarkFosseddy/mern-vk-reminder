import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getReminders } from '../../actions/reminderActions';

import ReminderItem from './ReminderItem';

import { ListGroup } from 'reactstrap';

class ReminderList extends Component {
  componentDidMount() {
    this.props.getReminders();
  }
  render() {
    return (
      <ListGroup>
        {
          this.props.reminders.map(reminder => (
            <ReminderItem
              key={reminder._id}
              reminder={reminder}
            />
          ))
        }
      </ListGroup>
    );
  }
}

const mapStateToProps = state => ({
  reminders: state.reminder.reminders
});

export default connect(mapStateToProps, { getReminders })(ReminderList);
