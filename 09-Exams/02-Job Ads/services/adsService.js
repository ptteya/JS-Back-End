const Ad = require('../models/Ad');

exports.getAll = () => Ad.find({}).lean();

exports.getOne = (adId) => Ad.findById(adId).lean();

exports.create = (authorId, data) => Ad.create({ ...data, author: authorId });

exports.delete = (adId) => Ad.findByIdAndDelete(adId);

exports.edit = (adId, data) => Ad.findByIdAndUpdate(adId, data, { runValidators: true });

exports.apply = async (adId, userId) => {
    const ad = await Ad.findById(adId);

    if (!ad.usersApplied.some(x => x == userId)) {
        ad.usersApplied.push(userId);
        await ad.save();
    }
}

exports.search = async (email) => {
    const ads = await this.getAll().populate('author');

    if (email) {
        return ads.filter(x => x.author.email.toLowerCase() == email.toLowerCase())
    }
};
