import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

const NavBar = props => {
	const authNavBar = (
		<nav className="nav">
			<Link className="navbar-brand btn btn-link" to="/dashboard">
				VK Reminder
			</Link>
			<ul className="nav ml-auto">
				<li className="nav-item">
					<button
						className="btn btn-link"
						onClick={() => props.logoutUser(props.history)}
					>
						Logout
					</button>
				</li>
			</ul>
		</nav>
	);

	const notAuthNavBar = (
		<nav className="nav">
			<Link className="navbar-brand btn btn-link" to="/">
				VK Reminder
			</Link>
			<ul className="nav ml-auto">
				<li className="nav-item">
					<Link className="btn btn-link" to="/login">
						Login
					</Link>
				</li>
				<li className="nav-item">
					<Link className="btn btn-link" to="/register">
						Register
					</Link>
				</li>
			</ul>
		</nav>
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
