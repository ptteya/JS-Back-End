const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minLength: 5,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        minLength: 1,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        minLength: 1,
        required: [true, 'Last name is required']
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            return next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;