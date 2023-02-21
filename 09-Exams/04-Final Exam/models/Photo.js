const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "Name is too short!"],
        required: [true, 'Name is required!']
    },
    imageUrl: {
        type: String,
        validate: [/^https?:\/\//, 'Image url should start with http or https!'],
        required: [true, 'Image is required!']
    },
    age: {
        type: Number,
        min: [1, 'Age is less than the minimum allowed!'],
        max: [100, 'Age is more than the maximum allowed!'],
        required: [true, 'Age is required!']
    },
    description: {
        type: String,
        minLength: [5, 'Description is too short!'],
        maxLength: [50, 'Description is too long!'],
        required: [true, 'Description is required!']
    },
    location: {
        type: String,
        minLength: [5, 'Location is too short!'],
        maxLength: [50, 'Location is too long!'],
        required: [true, 'Location is required!']
    },
    commentList: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
            comment: String
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;

