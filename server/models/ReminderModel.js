const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	text: {
		type: String,
		required: true
	},
	whenToRemind: {
		type: Date,
		required: true
	},
	isCompleted: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = ReminderModel = mongoose.model('Reminder', ReminderSchema);
