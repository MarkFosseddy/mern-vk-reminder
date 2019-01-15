import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import { addReminder } from '../../../actions/reminderActions';

import ErrorMsg from  '../../ErrorMsg';

import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap';

registerLocale('ru', ru);

class ReminderModal extends Component {
  state = {
    modal: false,
    text: '',
    whenToRemind: new Date()
  };

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

    if (this.state.text.trim() === '') {
      return;
    }

    const newReminder = {
      text: this.state.text,
      whenToRemind: this.state.whenToRemind
    };
    
    this.props.addReminder(newReminder);

    this.setState({
      text: '',
      whenToRemind: new Date()
    });
    this.toggle();
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="text-center mb-5">
        <Button  
          onClick={this.toggle}
          color="info"
          size="lg"
        >
          Создать напоминание
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Новое напоминание
          </ModalHeader>

          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  placeholder="Напоминание"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
                <ErrorMsg 
                  errors={errors}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <DatePicker
                  inline
                  selected={this.state.whenToRemind}
                  onChange={this.onDatePickerChange}
                  locale="ru"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="d MMM yyyy hh:mm "
                  timeCaption="время"
                />
              </FormGroup>
              <Button block>Создать</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(mapStateToProps, { addReminder })(ReminderModal);