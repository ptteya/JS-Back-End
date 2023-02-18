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
    description: {
        type: String,
        maxLength: 40,
        required: [true, 'Description is required']
    },
    ads: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Ads'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;