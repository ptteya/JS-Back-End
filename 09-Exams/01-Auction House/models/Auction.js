const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 4,
        required: true,
    },
    category: {
        type: String,
        enum: {
            values: ['estate', 'vehicles', 'furniture', 'electronics', 'other'],
            message: 'Invalid category'
        },
        required: [true, 'Category is required'],
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        maxLength: 200,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bidden: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;