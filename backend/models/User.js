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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
