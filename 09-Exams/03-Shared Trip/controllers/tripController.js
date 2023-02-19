const router = require('express').Router();

const { getErrorMessage } = require('../utils/errorUtils');
const tripService = require('../services/tripService');
const { isUser } = require('../middlewares/authMiddleware');
const { isCreator } = require('../middlewares/tripMiddleware');

router.get('/catalog', async (req, res) => {
    const trips = await tripService.getAll();
    res.render('trip/catalog', { trips });
});

router.get('/create', isUser, (req, res) => {
    res.render('trip/create');
});

router.post('/create', isUser, async (req, res) => {
    const trip = req.body;

    try {
        await tripService.create(req.user._id, trip);
        res.redirect('/trips/catalog');
    } catch (error) {
        res.render('trip/create', { error: getErrorMessage(error), trip });
    }
});

router.get('/:tripId/details', async (req, res) => {
    const trip = await tripService.getOne(req.params.tripId)
        .populate('creator')
        .populate('buddies');

    const isCreator = trip.creator._id == req.user?._id;
    const hasSeats = trip.seats > 0;
    const hasJoined = trip.buddies?.some(x => x._id == req.user?._id);

    res.render('trip/details', { trip, isCreator, hasSeats, hasJoined });
});

router.get('/:tripId/join', isUser, async (req, res) => {
    await tripService.join(req.params.tripId, req.user._id);

    res.redirect(`/trips/${req.params.tripId}/details`);
});

router.get('/:tripId/edit', isUser, isCreator, async (req, res) => {
    const trip = await tripService.getOne(req.params.tripId);

    res.render('trip/edit', { trip });
});

router.post('/:tripId/edit', isUser, isCreator, async (req, res) => {
    const updatedTripData = req.body;
    const tripId = req.params.tripId;

    try {
        await tripService.edit(tripId, updatedTripData);
        res.redirect(`/trips/${tripId}/details`);
    } catch (error) {
        res.render('trip/edit', { error: getErrorMessage(error), trip: updatedTripData });
    }
});

router.get('/:tripId/delete', isUser, isCreator, async (req, res) => {
    await tripService.delete(req.params.tripId);
    res.redirect('/trips/catalog');
});

module.exports = router;