import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';

import ErrorMsg from '../ErrorMsg';

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

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.props;
    const { username, vk, password } = this.state;

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
            placeholder="VK link e.g. https://vk.com/markfosseddy"
            name="vk"
            value={vk}
            onChange={this.onChange}
          />
          <ErrorMsg 
            errors={errors}
            type="vk"
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

        <Button color="primary" block>Register</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error.errors
});

export default connect(mapStateToProps, { registerUser })(Registration);
