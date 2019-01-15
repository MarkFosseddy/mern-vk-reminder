const validateReminder = require('../lib/validation/reminder/validateReminder');
const ReminderModel = require('../models/ReminderModel');

exports.getReminders = async (req, res) => {
  try {
    const reminders = await ReminderModel
      .find({ user_id: req.user.id })
      .sort({ createdAt: -1 });
    
    return res.status(200).json(reminders);

  } catch (err) {
    console.error(err);
  }
};

exports.addReminder = (req, res) => {
  try {
    const newReminder = new ReminderModel({
      user_id: req.user.id,
      text: req.body.text,
      whenToRemind: req.body.whenToRemind
    });

    let errors = [];
    validateReminder(newReminder, errors);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    newReminder.save();
    newReminder.schedule();
    
    return res.status(200).json(newReminder)

  } catch (err) {
    console.error(err);
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const data = {
      text: req.body.text,
      whenToRemind: req.body.whenToRemind
    };
    let errors = [];
    validateReminder(data, errors);
    if (errors.lenght > 0) {
      return res.status(400).json(errors);
    }

    const reminder = await ReminderModel
      .findOne({ _id: req.params.id });

    reminder.cancel();

    reminder.text = req.body.text;
    reminder.whenToRemind = req.body.whenToRemind;
    reminder.save();

    reminder.schedule();

    return res.status(200).json(reminder);

  } catch (err) {
    console.error(err);
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await ReminderModel
      .findOne({ _id: req.params.id });
      
    reminder.cancel();
    reminder.remove();

    return res.status(200).json({
      msg: 'Reminder successfully removed'
    });

  } catch (err) {
    console.error(err);
  }
};