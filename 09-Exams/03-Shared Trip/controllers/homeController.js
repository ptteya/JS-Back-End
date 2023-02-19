const router = require('express').Router();
const tripService = require('../services/tripService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', async (req, res) => {
    const user = req.user;
    const isMale = user.gender == 'male';

    const trips = await tripService.getTripsByCreatorId(user._id);

    res.render('home/profile', { email: user.email, isMale, trips });
});

module.exports = router;