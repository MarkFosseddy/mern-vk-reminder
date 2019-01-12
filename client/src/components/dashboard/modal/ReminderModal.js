import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import { addReminder, updateReminder } from '../../../actions/reminderActions';

import CustomHeader from './CustomHeader';
import CustomButton from './CustomButton';


import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input
} from 'reactstrap';

registerLocale('ru', ru);

class ReminderModal extends Component {
  state = {
    modal: false,
    text: '',
    whenToRemind: new Date()
  };

  componentDidMount() {
    const { text, whenToRemind } = this.props;
    if (text && whenToRemind) {
      this.setState({
        text,
        whenToRemind: new Date(whenToRemind)
      });
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  onChange = event => {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  onDatePickerChange = date => {
    this.setState({ whenToRemind: date });
  }

  onSubmit = event => {
    event.preventDefault();

    const newReminder = {
      text: this.state.text,
      whenToRemind: this.state.whenToRemind
    };

    const { method, addReminder, updateReminder, id } = this.props;
    if (method === 'add') {
      addReminder(newReminder);
    } else {
      updateReminder(id, newReminder);
    }

    this.toggle();
  }

  render() {
    return (
      <div className="text-center mb-5">
        <CustomButton
          onClick={this.toggle}
          method={this.props.method}
          color="info"
        />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <CustomHeader
            toggle={this.toggle}
            method={this.props.method}
          />

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
                <DatePicker
                  selected={this.state.whenToRemind}
                  onChange={this.onDatePickerChange}
                  locale="ru"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="d MMM yyyy h:mm"
                  timeCaption="time"
                />
              </FormGroup>
              <CustomButton
                block={true}
                method={this.props.method}
              />
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


export default connect(null, { addReminder, updateReminder })(ReminderModal);