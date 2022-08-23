const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minLength:6,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
