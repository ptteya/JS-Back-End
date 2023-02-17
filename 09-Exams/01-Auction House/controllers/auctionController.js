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
        res.redirect('/auction/browse');
    } catch (error) {
        res.status(400).render('auction/create', { error: getErrorMessage(error) });
    }
});

router.get('/browse', async (req, res) => {
    const auctions = await auctionService.getAll();

    res.render('auction/browse', { auctions });
});

router.get('/:auctionId/details', async (req, res) => {
    const auction = await auctionService.getOne(req.params.auctionId).populate('author').populate('bidder');
    const author = `${auction.author.firstName} ${auction.author.lastName}`;

    const isAuthor = auction.author._id == req.user?._id;
    const canBid = !isAuthor && auction.bidder?._id != req.user?._id;

    res.render('auction/details', { auction, author, isAuthor, canBid });
});

router.post('/:auctionId/bid', async (req, res) => {
    const { bidAmount } = req.body;

    try {
        await auctionService.updatePriceAndBidder(req.user._id, req.params.auctionId, Number(bidAmount));
        res.redirect(`/auction/${req.params.auctionId}/details`);
    } catch (err) {
        res.status(400).render('auction/create', { error: getErrorMessage(error) });
    }
});

module.exports = router;