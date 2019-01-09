import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dashboard extends Component {
	render() {
		const { username } = this.props.user;
		return (
			<div>
				<h1>Hello, { username || 'Stranger' }</h1>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
