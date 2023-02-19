const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: 'Choose between male and female'

        },
        required: [true, 'Description is required']
    },
    tripsHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Trip'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;