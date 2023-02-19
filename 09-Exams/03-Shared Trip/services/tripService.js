const Trip = require('../models/Trip');

exports.getOne = (id) => Trip.findById(id).lean();

exports.getAll = () => Trip.find({}).lean();

exports.getTripsByCreatorId = (creatorId) => Trip.find({ creator: creatorId }).lean();

exports.create = (creatorId, data) => Trip.create({ ...data, creator: creatorId });

exports.edit = (tripId, data) => Trip.findByIdAndUpdate(tripId, data, { runValidators: true });

exports.delete = (id) => Trip.findByIdAndDelete(id);

exports.join = async (tripId, userId) => {
    const trip = await Trip.findById(tripId);

    if (!trip.buddies.some(x => x == userId) && trip.seats > 0) {
        trip.buddies.push(userId);
        trip.seats -= 1;
        return trip.save();
    }
};

