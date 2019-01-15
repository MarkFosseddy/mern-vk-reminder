const express = require('express');
const router = express.Router();
const passport = require('passport');

const reminderController = require('../../controllers/reminderController');

// @route   GET api/reminders/
// @desc    get all reminders
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  reminderController.getReminders
);

// @route   POST api/reminders/
// @desc    add reminder
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  reminderController.addReminder
);

// @route   DELETE api/reminders/:id
// @desc    delete reminder
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  reminderController.deleteReminder
);

module.exports = router;
