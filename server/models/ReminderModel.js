const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  whenToRemind: {
    type: Date,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

const ReminderModel = mongoose.model('Reminder', ReminderSchema);
module.exports = ReminderModel;
