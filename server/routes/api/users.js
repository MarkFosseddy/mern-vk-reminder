const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

// @route   POST api/users/register
// @desc    register user
// @access  Public
router.post('/register', userController.register);

// @route   POST api/users/login
// @desc    login user
// @access  Public
router.post('/login', userController.login);

module.exports = router;
