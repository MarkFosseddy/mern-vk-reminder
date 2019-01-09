import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';

class Registration extends Component {
	state = {
		username: '',
		vk: '',
		password: ''
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
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
			<div>
				<p>Please register an account</p>
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
							placeholder="VK link"
							name="vk"
							value={ this.state.vk }
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
						value="Register"
					/>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.error
});

export default withRouter(connect(mapStateToProps, { registerUser })(Registration));
