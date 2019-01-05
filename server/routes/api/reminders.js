const express = require('express');
const router = express.Router();

const Reminders = require('../../models/Reminders');

// get all reminders
router.get('/', (req, res) => {
	Reminders.find().then(reminder => res.json(reminder));
});

// add new reminder
router.post('/', (req, res) => {
	const newReminder = new Reminders({ text: req.body.text });
	newReminder
		.save()
		.then(() =>
			res.status(200).json({
				success: true,
				message: 'Reminder has been created'
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
	Reminders.findById(req.params.id)
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
router.delete('/:id', (req, res) => {});

module.exports = router;
