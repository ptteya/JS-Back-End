const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find({});

exports.getOne = (cryptoId) => Crypto.findById(cryptoId);

exports.search = async (name, payment) => {
    let crypto = await this.getAll().lean();

    if (name) {
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if (payment) {
        crypto = crypto.filter(x => x.payment == payment);
    }

    return crypto;
}

exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);

    if (!crypto.buyers.some(x => x == userId)) {
        crypto.buyers.push(userId);
        return crypto.save();
    }
}

exports.create = (ownerId, cryptoData) => Crypto.create({ ...cryptoData, owner: ownerId });

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, { runValidators: true });

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);