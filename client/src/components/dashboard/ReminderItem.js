import React from 'react';
import { connect } from 'react-redux';

import { deleteReminder } from '../../actions/reminderActions';
import makeDateUserFriendly from '../../utils/makeDateUserFriendly';

import { 
  Button, 
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
          <div style={
              reminder.isCompleted 
                ? { opacity: 0.6, textDecoration: 'line-through' }
                : undefined
          }>
            {reminder.text}
            <br />
            <small>{makeDateUserFriendly(reminder.whenToRemind)}</small>
          </div>
        </Col>
        <Col xs="auto">
          <Button
            onClick={() => deleteReminder(reminder._id)}
            color="danger"
          >
            X
          </Button>
        </Col>
      </Row>
    </Container>
  </ListGroupItem>
);

export default connect(null, { deleteReminder })(ReminderItem);
