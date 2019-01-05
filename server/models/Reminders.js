const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = Reminders = mongoose.model('Reminder', ReminderSchema);