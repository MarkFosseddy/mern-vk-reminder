import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';

import { Button, Form, FormGroup, Input } from 'reactstrap';

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
	    <Form onSubmit={ this.onSubmit }>
	      <FormGroup>
	        <Input 
	          placeholder="Username"
	          name="username"
	          value={ this.state.username }
	          onChange={ this.onChange }
	        />
	      </FormGroup>
	      <FormGroup>
	        <Input 
	          placeholder="Password"
	          name="password"
	          value={ this.state.password }
	          onChange={ this.onChange }
	        />
	      </FormGroup>

	      <Button color="success" block>Login</Button>
	    </Form>
	  );
	}
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(mapStateToProps, { loginUser })(Login)
);
