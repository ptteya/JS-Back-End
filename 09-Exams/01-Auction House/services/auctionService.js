const Auction = require('../models/Auction');

exports.create = (authorId, auctionData) => Auction.create({ ...auctionData, author: authorId });

exports.getAll = () => Auction.find({}).lean();