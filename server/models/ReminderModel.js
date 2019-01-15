const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agenda = require('../lib/agenda/agenda');
require('../lib/agenda/jobs')(agenda);

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
  }
}, { timestamps: true });

ReminderSchema.methods.schedule = function() {
  agenda.schedule(
    this.whenToRemind, 
    'send reminder', 
    { 
      reminder_id: this._id,
      text: this.text,
      reminder_user_id: this.user_id
    }
  );
};

ReminderSchema.methods.cancel = function() {
  const data = {
    reminder_id: this._id,
    text: this.text,
    reminder_user_id: this.user_id
  };

  agenda.cancel({ data });
};

const ReminderModel = mongoose.model('Reminder', ReminderSchema);
module.exports = ReminderModel;
