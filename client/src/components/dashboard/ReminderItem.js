import React from 'react';

const ReminderItem = ({ reminder }) => (
	<li>
		{ reminder.text }
		<br />
		<small>{ reminder.whenToRemind }</small>
	</li>
);

export default ReminderItem;