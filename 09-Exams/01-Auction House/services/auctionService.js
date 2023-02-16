const Auction = require('../models/Auction');

exports.getOne = (auctionId) => Auction.findById(auctionId).lean();

exports.getAll = () => Auction.find({}).lean();

exports.create = (authorId, auctionData) => Auction.create({ ...auctionData, author: authorId });