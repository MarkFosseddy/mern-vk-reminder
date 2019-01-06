const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    vk: {
        type: String,
        required: true
    }
});

module.exports = UserModel = mongoose.model('User', UserSchema);