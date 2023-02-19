const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    startPoint: {
        type: String,
        minLength: 4,
        required: [true, 'Start point is required!']
    },
    endPoint: {
        type: String,
        minLength: 4,
        required: [true, 'End point is required!']
    },
    date: {
        type: String,
        required: [true, 'Date is required!']
    },
    time: {
        type: String,
        required: [true, 'Time is required']
    },
    carImage: {
        type: String,
        validate: /^https?:\/\//,
        required: [true, 'Car image is required!']
    },
    carBrand: {
        type: String,
        minLength: 4,
        required: [true, 'Car brand is required!']
    },
    seats: {
        type: Number,
        min: 0,
        max: 4,
        required: [true, 'Seats is required!']
    },
    price: {
        type: Number,
        min: 1,
        max: 50,
        required: [true, 'Price is required!']
    },
    description: {
        type: String,
        minLength: 4,
        required: [true, 'Description is required!']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buddies: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;