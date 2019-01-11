const express = require('express');
const router = express.Router();
const passport = require('passport');

const ReminderModel = require('../../models/ReminderModel');

// @route   GET api/reminders/
// @desc    get reminders
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		ReminderModel.find({ user_id: req.user.id })
			.sort({ date: -1 })
			.then(reminders => res.status(200).json(reminders))
			.catch(() =>
				res.status(404).json({
					success: false,
					message: 'Something went wrong'
				})
			);
	}
);

// @route   POST api/reminders/
// @desc    add new reminder
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const newReminder = new ReminderModel({
			user_id: req.user.id,
			text: req.body.text,
			whenToRemind: req.body.whenToRemind
		});
		newReminder
			.save()
			.then(() => res.status(200).json(newReminder))
			.catch(() =>
				res.status(400).json({
					success: false,
					message: 'Input must not be empty'
				})
			);
	}
);

// @route   PUT api/reminders/:id
// @desc    update reminder
// @access  Private
router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		ReminderModel.findOne({ _id: req.params.id })
			.then(reminder => {
				reminder.text = req.body.text;
				reminder.whenToRemind = req.body.whenToRemind;
				reminder
					.save()
					.then(() => res.status(200).json(reminder))
					.catch(() =>
						res.status(400).json({
							success: false,
							message: 'Input must not be empty'
						})
					);
			})
			.catch(() =>
				res.status(404).json({
					success: false,
					message: 'Reminder does not exist'
				})
			);
	}
);

// @route   DELETE api/reminders/:id
// @desc    delete user reminder
// @access  Private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		ReminderModel.findOne({ _id: req.params.id })
			.then(reminder =>
				reminder
					.remove()
					.then(() =>
						res.status(200).json({
							success: true,
							message: 'Reminder successfully removed'
						})
					)
					.catch(err => console.error(err))
			)
			.catch(() =>
				res.status(404).json({
					success: false,
					message: 'Reminder does not exist'
				})
			);
	}
);

module.exports = router;
