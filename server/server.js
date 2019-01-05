const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

// body-parser middleware
app.use(bodyParser.json());

// api routes
const reminders = require('./routes/api/reminders');

// use routes
app.use('/api/reminders', reminders);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('listening to port ' + port));
