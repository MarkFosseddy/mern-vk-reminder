const vk = require('./vk');

module.exports = agenda => {
  agenda.define('send reminder', async job => {
    try {
      const UserModel = require('../../models/UserModel');
      const ReminderModel = require('../../models/ReminderModel');
      const {
        reminder_user_id,
        text,
        reminder_id
      } = job.attrs.data;

      const user = await UserModel
        .findOne({ _id: reminder_user_id });
      vk.sendReminder(text, user.vk);

      const reminder = await ReminderModel
        .findOne({ _id: reminder_id });
      reminder.isCompleted = true;
      reminder.save();
      reminder.cancel();

    } catch (err) {
      console.error(err);
    }
  })
};