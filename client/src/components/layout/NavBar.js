import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const NavBar = props => {
	const authNavBar = (
		<ul>
			<li>
				<Link to="/dashboard">Home</Link>
			</li>
			<li>
				<Link to="/">Logout</Link>
			</li>
		</ul>
	);
	
	const notAuthNavBar = (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">LogIn</Link>
			</li>
		</ul>
	);

	return (
        <div>
            { props.isAuthenticated ? authNavBar : notAuthNavBar }     
        </div>
    );
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(NavBar));