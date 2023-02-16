const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: /^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+/,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        required: true
    },
    firstName: {
        type: String,
        minLength: 1,
        required: true
    },
    lastName: {
        type: String,
        minLength: 1,
        required: true
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            return next();
        })
});

const User = mongoose.model('User', userSchema);

module.exports = User;