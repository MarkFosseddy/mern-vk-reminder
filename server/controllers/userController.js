const validateRegistration = require('../lib/validation/validateRegistration');
const { 
  wrongPassword, 
  wrongUsername
} = require('../lib/validation/validateLogin');
const UserModel = require('../models/UserModel');

exports.register = async (req, res) => {
  try {
    const { username, password, vk } = req.body;

    const newUser = new UserModel({
      username,
      password,
      vk
    });
    const user = await UserModel.findOne({ username });

    let errors = [];
    validateRegistration(user, newUser, errors);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    await newUser.encryptPassword();

    return res.status(200).json({
      msg: 'User successfully registered'
    });

  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let errors = [];

    const user = await UserModel.findOne({ username });
    if (!user) {
      wrongUsername(errors);
      return res.status(400).json(errors);
    }

    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      wrongPassword(errors);
      return res.status(400).json(errors);
    }

    const jwtToken = user.generateJwt();
    return res.status(200).json({
      msg: 'You are successfully logged in',
      jwtToken: `Bearer ${jwtToken}`
    });

  } catch (err) {
    console.error(err);
  }
};