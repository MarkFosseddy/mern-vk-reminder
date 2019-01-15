// support .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
// passport config
require('./config/passport')(passport);

const app = express();

// connect Mongo
const { mongoDB } = require('./config/keys');
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));
