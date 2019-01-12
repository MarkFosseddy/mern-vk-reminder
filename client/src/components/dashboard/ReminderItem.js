import React from 'react';
import { connect } from 'react-redux';

import { deleteReminder } from '../../actions/reminderActions';
import makeDateUserFriendly from '../../utils/makeDateUserFriendly';

import ReminderModal from './modal/ReminderModal';

import { 
  Button, 
  ButtonGroup, 
  ListGroupItem, 
  Container, 
  Row, 
  Col 
} from 'reactstrap';

const ReminderItem = ({ reminder, deleteReminder }) => (
  <ListGroupItem>
    <Container>
      <Row>
        <Col>
          {reminder.text}
          <br />
          <small>{makeDateUserFriendly(reminder.whenToRemind)}</small>
        </Col>
        <Col xs="auto">
          <ButtonGroup vertical>
            <Button
              onClick={() => deleteReminder(reminder._id)}
              color="danger"
            >
              X
            </Button>
            <ReminderModal
              text={reminder.text}
              whenToRemind={reminder.whenToRemind}
              id={reminder._id}
            />
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  </ListGroupItem>
);

export default connect(null, { deleteReminder })(ReminderItem);
