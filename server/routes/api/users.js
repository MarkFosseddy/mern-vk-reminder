const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UserModel = require('../../models/UserModel');
const secret = require('../../config/keys').secretOrKey;

router.post('/register', (req, res) => {
	UserModel.findOne({ username: req.body.username }).then(user => {
		if (user)
			return res.status(400).json({
				success: false,
				message: 'This username is already taken'
			});

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
				newUser
					.save()
					.then(() =>
						res.status(200).json({
							success: true,
							message: 'User successfully registred'
						})
					)
					.catch(err => console.error(err));
			});
		});
	});
});

router.post('/login', (req, res) => {
	UserModel.findOne({ username: req.body.username }).then(user => {
		if (!user)
			return res.status(400).json({
				success: false,
				message: 'User does not exist'
			});

		bcrypt
			.compare(req.body.password, user.password)
			.then(() => {
				const payload = {
					id: user.id,
					username: user.username,
					vk: user.vk
				};
				jwt.sign(
                    payload, 
                    secret, 
                    { expiresIn: '1h' }, 
                    (err, token) => 
                        res.status(200).json({
                            success: true,
                            message: 'You are successfully logged in',
                            token: 'Bearer ' + token
                        })
				);
			})
			.catch(() =>
				res.status(400).json({
					success: false,
					message: 'Incorrect password'
				})
			);
	});
});

router.get('/logout', (req, res) => {});

module.exports = router;
