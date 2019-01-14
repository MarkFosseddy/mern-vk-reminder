const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { validateVKLink } = require('./validation');

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: [4, 'Username must contain at least 4 characters'],
    required: [true, 'Please enter the username'],
    trim: true
  },
  password: {
    type: String,
    minlength: [4, 'Password must contain at least 4 characters'],
    required: [true, 'Please enter the password'],
    trim: true
  },
  vk: {
    type: String,
    required: [true, 'Please enter your vk link'],
    trim: true,
    validate: [validateVKLink, 'Please enter valid vk link']
  }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
