import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import Register from './components/authentiocation/Registration';
import Login from './components/authentiocation/Login';
import Dashboard from './components/Dashboard';

import store from './store';

import './App.css';

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<Router>
					<div>
						<NavBar />
						<Route exact path="/" component={ Landing } />
						<Route path="/register" component={ Register } />
						<Route path="/login" component={ Login } />
						<Route path="/dashboard" component={ Dashboard } />
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
