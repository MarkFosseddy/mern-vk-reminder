import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      { ...rest }
      render={ props => 
        isAuthenticated 
          ? ( <Component {...props} /> ) 
          : ( <Redirect to='/login' /> )
      }
    />
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(mapStateToProps)(PrivateRoute)
);