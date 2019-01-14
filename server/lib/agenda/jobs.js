const vk = require('./vk');

const UserModel = require('../../models/UserModel');
const ReminderModel = require('../../models/ReminderModel');

module.exports = agenda => {
  agenda.define('send reminder', async job => {
    try {
      const { data } = job.attrs;
      const {
        reminder_user_id,
        text,
        reminder_id
      } = data;

      const user = await UserModel
        .findById(reminder_user_id);
      vk.sendReminder(text, user.vk);

      const reminder = await ReminderModel
        .findById(reminder_id);
      reminder.isCompleted = true;
      reminder.save();

      agenda.cancel({ data });

    } catch (err) {
      console.error(err);
    }
  })
};