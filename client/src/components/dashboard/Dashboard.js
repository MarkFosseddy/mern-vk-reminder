import React from 'react';
import { connect } from 'react-redux';

import ReminderList from './ReminderList';
import ReminderModal from './modal/ReminderModal';

const Dashboard = ({ user }) => (
  <div>
    <h1 className="text-center mb-5">
      Привет, {user.username}
    </h1>
    <ReminderModal method="add" />
    <ReminderList />
  </div>
);

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
