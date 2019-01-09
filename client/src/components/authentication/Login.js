import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';

class Login extends Component {
	state = {
		username: '',
		password: ''
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

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
		
		this.props.loginUser(userData, this.props.history);
	}

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
	isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
