const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RemindersSchema = new Schema({
    text: {
        type: String,
        required: true
    }
});

module.exports = Reminders = mongoose.model('Reminders', RemindersSchema);