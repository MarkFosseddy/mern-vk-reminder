import React from 'react';

import ReminderItem from './ReminderItem';

const ReminderList = ({ reminders }) => {
	return(
		<ul>
			{
				reminders.map(reminder => (
					<ReminderItem
						key={ reminder._id }
						reminder={ reminder }
					/>
				))
			}
		</ul>
	);
};

export default ReminderList;