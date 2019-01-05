const express = require('express');
const router = express.Router();

const ReminderModel = require('../../models/ReminderModel');

// get all reminders
router.get('/', (req, res) => {
	ReminderModel.find().then(reminders => res.json(reminders));
});

// add new reminder
router.post('/', (req, res) => {
	const newReminder = new ReminderModel({ text: req.body.text });
	newReminder
		.save()
		.then(() =>
			res.status(200).json({
				success: true,
				message: 'Reminder successfully created'
			})
		)
		.catch(() =>
			res.status(400).json({
				success: false,
				message: 'Input must not be empty'
			})
		);
});

// update reminder
router.put('/:id', (req, res) => {
	ReminderModel.findById(req.params.id)
		.then(reminder => {
			reminder.text = req.body.text;
			reminder
				.save()
				.then(() =>
					res.status(200).json({
						success: true,
						message: 'Reminder successfully updated'
					})
				)
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
});

// delete reminder
router.delete('/:id', (req, res) => {
	ReminderModel.findById(req.params.id)
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
});

module.exports = router;
