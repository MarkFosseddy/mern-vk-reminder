import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';

import { Button, Form, FormGroup, Input } from 'reactstrap';

class Registration extends Component {
	state = {
		username: '',
		vk: '',
		password: ''
	};

	onChange = event => {
		this.setState({ [ event.target.name ]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();

		const newUser = {
			username: this.state.username,
			vk: this.state.vk,
			password: this.state.password
		};

		this.setState({
			username: '',
			vk: '',
			password: ''
		});

		this.props.registerUser(newUser, this.props.history);
	};
	render() {
		return (
			<Form onSubmit={this.onSubmit}>
				<FormGroup>
					<Input
						placeholder="Username"
						name="username"
						value={this.state.username}
						onChange={this.onChange}
					/>
				</FormGroup>

				<FormGroup>
					<Input
						placeholder="VK link"
						name="vk"
						value={this.state.vk}
						onChange={this.onChange}
					/>
				</FormGroup>

				<FormGroup>
					<Input
						placeholder="Password"
						name="password"
						value={this.state.password}
						onChange={this.onChange}
					/>
				</FormGroup>

				<Button color="primary" block>Register</Button>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	error: state.error
});

export default withRouter(
	connect(mapStateToProps, { registerUser })(Registration)
);
