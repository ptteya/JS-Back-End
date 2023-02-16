const router = require('express').Router();

const auctionService = require('../services/auctionService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('auction/create');
});

router.post('/create', async (req, res) => {
    const auctionData = req.body;

    try {
        await auctionService.create(req.user._id, auctionData);
    } catch (error) {
        res.status(400).render('auction/create', { error: getErrorMessage(error) });
    }

    res.redirect('/auction/browse');
});

router.get('/browse', async (req, res) => {
    const auctions = await auctionService.getAll();

    res.render('auction/browse', { auctions });
});

module.exports = router;