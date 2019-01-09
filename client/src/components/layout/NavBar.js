import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

import { Navbar, Nav, NavItem, Button } from 'reactstrap';

const NavBar = props => {
	const authNavBar = (
		<Navbar>
			<Link to="/dashboard" className="navbar-brand">
				VK Reminder
			</Link>
			<Nav className="ml-auto">
				<NavItem>
					<Button 
						onClick={ () => props.logoutUser(props.history) }
						color="link"
					>
						Logout
					</Button>
				</NavItem>
			</Nav>
		</Navbar>
	);

	const notAuthNavBar = (
		<Navbar>
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
	isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
	connect(mapStateToProps, { logoutUser })(NavBar)
);
