const agenda = require('../agenda/agenda');
require('../agenda/jobs')(agenda);

const ReminderModel = require('../models/ReminderModel');

exports.getReminders = (req, res) => {
  ReminderModel.find({ user_id: req.user.id })
    .sort({ date: -1 })
    .then(reminders => res.status(200).json(reminders))
    .catch(() =>
      res.status(404).json({
        success: false,
        message: 'Something went wrong'
      })
    );
};

exports.addReminder = (req, res) => {
  const newReminder = new ReminderModel({
    user_id: req.user.id,
    text: req.body.text,
    whenToRemind: req.body.whenToRemind
  });
  newReminder
    .save()
    .then(() => {
      agenda.schedule(
        newReminder.whenToRemind, 
        'send reminder', 
        { 
          reminder_id: newReminder._id,
          text: newReminder.text
        }
      );
      res.status(200).json(newReminder)
    })
    .catch(() =>
      res.status(400).json({
        success: false,
        message: 'Input must not be empty'
      })
    );
};

exports.updateReminder = (req, res) => {
  ReminderModel.findOne({ _id: req.params.id })
    .then(reminder => {
      const reminderData = {
        reminder_id: reminder._id,
        text: reminder.text
      };
      agenda.cancel({ data: reminderData });
      reminder.text = req.body.text;
      reminder.whenToRemind = req.body.whenToRemind;
      reminder
        .save()
        .then(() => {
          agenda.schedule(
            reminder.whenToRemind, 
            'send reminder', 
            { 
              reminder_id: reminder._id,
              text: reminder.text
            }
          );
          res.status(200).json(reminder)
        })
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
};

exports.deleteReminder = (req, res) => {
  ReminderModel.findOne({ _id: req.params.id })
    .then(reminder =>
      reminder
        .remove()
        .then(() => {
          const reminderData = {
            reminder_id: reminder._id,
            text: reminder.text
          };
          agenda.cancel({ data: reminderData });
          res.status(200).json({
            success: true,
            message: 'Reminder successfully removed'
          })
        })
        .catch(err => console.error(err))
    )
    .catch(() =>
      res.status(404).json({
        success: false,
        message: 'Reminder does not exist'
      })
    );
};