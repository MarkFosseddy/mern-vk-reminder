const vk = require('./vk');

const UserModle = require('../models/UserModel');
const ReminderModel = require('../models/ReminderModel');

module.exports = agenda => {
  agenda.define('send reminder', async job => {
    try {
      const user = await UserModle.findById(job.attrs.data.reminder_user_id);
      await vk.sendReminder(job.attrs.data.text, user.vk);
    
      const reminder = await ReminderModel.findById(job.attrs.data.reminder_id);
      reminder.isCompleted = true;
      await reminder.save();

      agenda.cancel({ data: job.attrs.data });

    } catch (err) {
      console.error(err);
    }
  })
};