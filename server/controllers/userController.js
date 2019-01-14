const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const secret = require('../config/keys').secretOrKey;

exports.register = async (req, res) => {
  try {
    const user = await UserModel
      .findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'This username is already taken'
      });
    }

    const newUser = new UserModel({
      username: req.body.username,
      password: req.body.password,
      vk: req.body.vk
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save();

        return res.status(200).json({
          success: true,
          message: 'User successfully registered'
        }); 
      })
    })

  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await UserModel
      .findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist'
      });
    }

    const isMatch = await bcrypt
      .compare(req.body.password, user.password);

    if (isMatch) {
      const payload = {
        id: user.id,
        username: user.username,
        vk: user.vk
      };
      jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          success: true,
          message: 'You are successfully logged in',
          jwtToken: `Bearer ${token}`
        })
      });
    }

  } catch (err) {
    console.error(err);
  }
};