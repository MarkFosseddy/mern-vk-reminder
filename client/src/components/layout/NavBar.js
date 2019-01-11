import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Navbar, Nav, NavItem, Button,
} from 'reactstrap';
import { logoutUser } from '../../actions/authActions';


const NavBar = (props) => {
  const authNavBar = (
    <Navbar className="mb-5">
      <Link to="/dashboard" className="navbar-brand">
        VK Reminder
      </Link>
      <Nav className="ml-auto">
        <NavItem>
          <Link to="/dashboard" className="btn btn-link">
            Dashboard
          </Link>
        </NavItem>
        <NavItem>
          <Button
            onClick={() => props.logoutUser(props.history)}
            color="link"
          >
            Logout
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );

  const notAuthNavBar = (
    <Navbar className="mb-5">
      <Link to="/" className="navbar-brand">
        VK Reminder
      </Link>
      <Nav className="ml-auto">
        <NavItem>
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/register" className="btn btn-link">
            Register
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );

  return (
    <>
      { props.isAuthenticated ? authNavBar : notAuthNavBar }
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(mapStateToProps, { logoutUser })(NavBar),
);
