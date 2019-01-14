const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: 4, 
    required: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 4,
    required: true,
    trim: true
  },
  vk: {
    type: String,
    required: true,
    trim: true
  }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
