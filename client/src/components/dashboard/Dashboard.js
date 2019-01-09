import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getReminders } from '../../actions/reminderActions';

import ReminderList from './ReminderList';
import ReminderModal from './ReminderModal';


class Dashboard extends Component {
	componentWillMount() {
		this.props.getReminders();
	}

	render() {
		const { username } = this.props.user;
		const { reminders } = this.props;
		return (
			<div >
				<h1 className="text-center">Hello, { username }</h1>
				<ReminderModal />
				<ReminderList reminders={ reminders }/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user,
	reminders: state.reminder.reminders
});

export default withRouter(
	connect(mapStateToProps, { getReminders })(Dashboard)
);
