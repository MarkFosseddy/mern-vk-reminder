import React from 'react';
import { connect } from 'react-redux';

import { deleteReminder, updateReminder } from '../../actions/reminderActions';

import UpdateReminderModal from './UpdateReminderModal';

import { Button, ButtonGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

const ReminderItem = ({ reminder, deleteReminder, updateReminder }) => (
	<ListGroupItem>
		<Container>
			<Row>
				<Col>
					{reminder.text}
					<br />
					<small>{reminder.whenToRemind}</small>
				</Col>
				<Col xs="auto">
					<ButtonGroup vertical>
						<Button
							onClick={() => deleteReminder(reminder._id)}
							color="danger"
						>
							X
						</Button>
						<UpdateReminderModal
							text={reminder.text}
							whenToRemind={reminder.whenToRemind}
							id={reminder._id}
							updateReminder={updateReminder}
						/>
					</ButtonGroup>
				</Col>
			</Row>
		</Container>
	</ListGroupItem>
);

export default connect(null, { deleteReminder, updateReminder })(ReminderItem);
