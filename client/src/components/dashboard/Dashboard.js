import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
    render() {
        const { username } = this.props.user;
        return(
            <div>
                <h1>Hello, { username || 'Stranger' }</h1>
                <button onClick={ () => this.props.logoutUser(this.props.history) }>
                    Logout
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Dashboard));