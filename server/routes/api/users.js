const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../../models/UserModel');
const secret = require('../../config/keys').secretOrKey;

// @route   POST api/users/register
// @desc    register user
// @access  Public
router.post('/register', (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'This username is already taken',
      });
    }

    const newUser = new UserModel({
      username: req.body.username,
      password: req.body.password,
      vk: req.body.vk,
    });

    return bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() => res.status(200).json({
            success: true,
            message: 'User successfully registred',
          }))
          .catch(() => res.status(400).json({
            success: false,
            message: 'Please fill all fields',
          }));
      });
    });
  });
});

// @route   POST api/users/login
// @desc    login user
// @access  Public
router.post('/login', (req, res) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
      });
    }

    return bcrypt
      .compare(req.body.password, user.password)
      .then(() => {
        const payload = {
          id: user.id,
          username: user.username,
          vk: user.vk,
        };
        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => res.status(200).json({
          success: true,
          message: 'You are successfully logged in',
          jwtToken: `Bearer ${token}`,
        }));
      })
      .catch(() => res.status(400).json({
        success: false,
        message: 'Incorrect password',
      }));
  });
});

module.exports = router;
