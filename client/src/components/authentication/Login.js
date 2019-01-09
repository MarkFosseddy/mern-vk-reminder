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
					<div className="form-group">
						<input 
							className="form-control"
							placeholder="Username"
							name="username"
							value={ this.state.username }
							onChange={ this.onChange }
						/>
					</div>
					<div className="form-group">
						<input 
							className="form-control"
							placeholder="Password"
							name="password"
							value={ this.state.password }
							onChange={ this.onChange }
						/>
					</div>

					<input 
						className="btn btn-success btn-block mt-4"
						type="submit" 
						value="Log In" 
					/>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
