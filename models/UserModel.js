const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config/keys');

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

UserSchema.methods.encryptPassword = 
  async function() {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      this.save();

    } catch (err) {
      console.error(err);
    }
  };

UserSchema.methods.comparePasswords = 
  async function(password) {
    try {
      return await bcrypt.compare(password, this.password);

    } catch (err) {
      console.error(err);
    }
  };

UserSchema.methods.generateJwt = function() {
  const payload = {
    id: this._id,
    username: this.username,
    vk: this.vk
  };
  
  return jwt.sign(payload, secretOrKey, { expiresIn: '1h' });
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
