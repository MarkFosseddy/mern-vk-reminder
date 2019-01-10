import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Register from './components/authentication/Registration';
import Login from './components/authentication/Login';
import Dashboard from './components/dashboard/Dashboard';

import authLoggedUser from './utils/authLoggedUser';

import store from './store';

import './App.css';

if (localStorage.jwtToken) {
  authLoggedUser(localStorage.jwtToken);
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Footer />
      </div>
    </Router>
  </Provider>
);


export default App;
