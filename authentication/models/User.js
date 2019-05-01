const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your username']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide your email.']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password.']
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted;
        next()
    })
});

module.exports = mongoose.model('User', UserSchema);