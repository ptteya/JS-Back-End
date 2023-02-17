const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [4, 'Title is too short'],
        required: [true, 'Title is required'],
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
        min: [0, 'Price must be a positive number'],
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        maxLength: [200, 'Description is too long'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;