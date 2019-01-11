import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getReminders } from '../../actions/reminderActions';

import ReminderList from './ReminderList';
import AddReminderModal from './AddReminderModal';


class Dashboard extends Component {
  componentWillMount() {
    this.props.getReminders();
  }

  render() {
    const { user, reminders } = this.props;
    return (
      <div>
        <h1 className="text-center mb-5">
          Hello, { user.username }
        </h1>
        <AddReminderModal />
        <ReminderList reminders={ reminders } />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  reminders: state.reminder.reminders,
});

export default withRouter(
  connect(mapStateToProps, { getReminders })(Dashboard),
);
