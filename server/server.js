const express = require('express');
const mongoose = require('mongoose');
// support .env file
require('dotenv').config();

const app = express();

// connect Mongo
const db = require('./config/database').MongoDB;
mongoose
	.connect(
		db,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// express body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
const reminders = require('./routes/api/reminders');
const users = require('./routes/users');

// use routes
app.use('/api/reminders', reminders);
app.use('/users/', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
