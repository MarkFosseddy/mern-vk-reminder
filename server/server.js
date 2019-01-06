const express = require('express');
const mongoose = require('mongoose');
// support .env file
require('dotenv').config();

const app = express();

// connect Mongo
mongoose
	.connect(
		process.env.DB,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// express body parse middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// api routes
const reminders = require('./routes/api/reminders');
const users = require('./routes/users');

// use routes
app.use('/api/reminders', reminders);
app.use('/users/', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('listening to port ' + port));
