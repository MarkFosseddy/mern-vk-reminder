import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import authReducer from '../../reducers/authReducer';

class Login extends Component {
	state = {
		username: '',
		password: ''
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmit = event => {
		event.preventDefault();

		const userData = {
			username: this.state.username,
			password: this.state.password
		};

		this.setState({
			username: '',
			password: ''
		});
		
		this.props.loginUser(userData);
	};

	render() {
		return (
			<div>
				<p>Please Log In</p>
				<form onSubmit={ this.onSubmit }>
					<div>Username</div>
					<input 
						placeholder="Username"
						name="username"
						value={ this.state.username }
						onChange={ this.onChange }
					/>

					<div>Password</div>
					<input 
						placeholder="Password"
						name="password"
						value={ this.state.password }
						onChange={ this.onChange }
					/>

					<div>
						<input type="submit" value="Log In" />
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps, { loginUser })(Login);
