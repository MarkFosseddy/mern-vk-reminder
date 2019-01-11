import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReminder } from '../../actions/reminderActions';

import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	Form, 
	FormGroup, 
	Input
} from 'reactstrap';


class AddReminderModal extends Component {
	state = {
		modal: false,
		text: '',
		whenToRemind: ''
	};

	toggle = () => {
		this.setState({ modal: !this.state.modal });
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit = event => {
		event.preventDefault();

		const newReminder = {
			text: this.state.text,
			whenToRemind: this.state.whenToRemind
		};

		this.setState({
			text: '',
			whenToRemind: ''
		});

		this.props.addReminder(newReminder);

		this.toggle();
	}

	render() {
		return (
			<div className="text-center mb-5">
				<Button onClick={ this.toggle }>
					Add Reminder
				</Button>
				<Modal
					isOpen={ this.state.modal }
					toggle={ this.toggle }
				>
					<ModalHeader toggle={ this.toggle }>Add Reminder</ModalHeader>

					<ModalBody>
						<Form onSubmit={ this.onSubmit }>
							<FormGroup>
								<Input
									placeholder="Text"
									name="text"
									value={ this.state.text }	
									onChange={ this.onChange }
								/>
							</FormGroup>
							<FormGroup>
								<Input
									placeholder="whenToRemind"
									name="whenToRemind"
									value={ this.state.whenToRemind }	
									onChange={ this.onChange }
								/>
							</FormGroup>
							<Button block>Add New Reminder</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}


export default connect(null, { addReminder })(AddReminderModal);
