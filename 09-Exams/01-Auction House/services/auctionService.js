const Auction = require('../models/Auction');

exports.getOne = (auctionId) => Auction.findById(auctionId).lean();

exports.getAll = () => Auction.find({ closed: false }).lean();

exports.create = (authorId, auctionData) => Auction.create({ ...auctionData, author: authorId });

exports.delete = (auctionId) => Auction.findByIdAndDelete(auctionId);

exports.update = (auctionId, data) => Auction.findByIdAndUpdate(auctionId, data, { runValidators: true });

exports.updatePriceAndBidder = async (userId, auctionId, bidAmount) => {
    const auction = await this.getOne(auctionId);

    if (userId == auction.bidder) {
        throw new Error('You are already the highest bidder');
    } else if (bidAmount <= auction.price) {
        throw new Error('The price should be bigger than the current one!');
    } else if (auction.author == userId) {
        throw new Error('You cannot bid for your own auction!');
    }

    return Auction.findByIdAndUpdate(auctionId, { price: bidAmount, bidder: userId }, { runValidators: true });
};

exports.closeAuction = (auctionId) => this.update(auctionId, { closed: true });

exports.getClosedAuctions = (userId) => Auction.find({ author: userId, closed: true }).populate('author').lean();

