const agenda = require('../agenda/agenda');
require('../agenda/jobs')(agenda);

const ReminderModel = require('../models/ReminderModel');

exports.getReminders = async (req, res) => {
  try {
    const reminders = await ReminderModel
      .find({ user_id: req.user.id })
      .sort({ date: -1 });
    
    return res.status(200).json(reminders);

  } catch {
    return res.status(404).json({
      success: false,
      message: 'Something went wrong'
    })
  }
};

exports.addReminder = (req, res) => {
  try {
    const newReminder = new ReminderModel({
      user_id: req.user.id,
      text: req.body.text,
      whenToRemind: req.body.whenToRemind
    });

    newReminder.save();

    agenda.schedule(
      newReminder.whenToRemind, 
      'send reminder', 
      { 
        reminder_id: newReminder._id,
        text: newReminder.text,
        reminder_user_id: newReminder.user_id
      }
    );

    return res.status(200).json(newReminder)

  } catch (err) {
    console.error(err);
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const reminder = await ReminderModel.findOne({ _id: req.params.id });

    const reminderData = {
      reminder_id: reminder._id,
      text: reminder.text,
      reminder_user_id: reminder.user_id
    };
    agenda.cancel({ data: reminderData });

    reminder.text = req.body.text;
    reminder.whenToRemind = req.body.whenToRemind;
    reminder.save();

    agenda.schedule(
      reminder.whenToRemind, 
      'send reminder', 
      { 
        reminder_id: reminder._id,
        text: reminder.text,
        reminder_user_id: reminder.user_id
      }
    );

    return res.status(200).json(reminder);

  } catch (err) {
    console.error(err);
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await ReminderModel
      .findOne({ _id: req.params.id });

    const reminderData = {
      reminder_id: reminder._id,
      text: reminder.text,
      reminder_user_id: reminder.user_id
    };

    reminder.remove();
    agenda.cancel({ data: reminderData });

    return res.status(200).json({
      success: true,
      message: 'Reminder successfully removed'
    });

  } catch (err) {
    console.error(err);
  }
};