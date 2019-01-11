import React, { Component } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap';


class UpdateReminderModal extends Component {
  state = {
    modal: false,
    text: '',
    whenToRemind: ''
  };

  componentWillMount() {
    this.setState({
      text: this.props.text,
      whenToRemind: this.props.whenToRemind
    });
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  onChange = event => {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();

    const updatedReminder = {
      text: this.state.text,
      whenToRemind: this.state.whenToRemind
    };

    this.props.updateReminder(this.props.id, updatedReminder);

    this.toggle();
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle} color="primary">
          Update
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Update Reminder</ModalHeader>

          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  placeholder="Text"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="whenToRemind"
                  name="whenToRemind"
                  value={this.state.whenToRemind}
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button block>Update Reminder</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default UpdateReminderModal;