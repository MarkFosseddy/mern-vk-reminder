import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

import ErrorMsg from '../ErrorMsg';

import { Button, Form, FormGroup, Input } from 'reactstrap';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  onChange = event => {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  }

  render() {
    const { errors } = this.props;
    const { username, password } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Input
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <ErrorMsg 
            errors={errors}
            type="username"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <ErrorMsg 
            errors={errors}
            type="password"
          />
        </FormGroup>

        <Button color="success" block>Login</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.error.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

