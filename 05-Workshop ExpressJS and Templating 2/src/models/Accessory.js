const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'URL is invalid'],
    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;