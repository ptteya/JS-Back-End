const tripService = require('../services/tripService');

exports.isCreator = async (req, res, next) => {
    const trip = await tripService.getOne(req.params.tripId);

    if (trip.creator == req.user?._id) {
        next();
    } else {
        res.redirect('/');
    }
}