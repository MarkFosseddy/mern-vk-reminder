// support .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
// passport config
require('./config/passport')(passport);

const app = express();

// connect Mongo
const mongoDB = require('./config/keys').MongoDB;
mongoose
  .connect(
    mongoDB,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// routes
const reminders = require('./routes/api/reminders');
const users = require('./routes/api/users');

// use routes
app.use('/api/reminders', reminders);
app.use('/api/users', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
