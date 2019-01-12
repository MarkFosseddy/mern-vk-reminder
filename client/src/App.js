import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Registration';
import Login from './components/authentication/Login';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

import { authLoggedUser } from './utils/authLoggedUser';

import store from './store';

if (localStorage.jwtToken) {
  authLoggedUser(localStorage.jwtToken);
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
