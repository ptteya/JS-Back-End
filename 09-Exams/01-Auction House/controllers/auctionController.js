const router = require('express').Router();

const auctionService = require('../services/auctionService');
const { getErrorMessage } = require('../utils/errorUtils');
const { getCategoryTypesViewData } = require('../utils/viewDataUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const { isAuthor } = require('../middlewares/auctionMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('auction/create');
});

router.post('/create', isAuth, async (req, res) => {
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
    } catch (error) {
        res.status(400).render('auction/create', { error: getErrorMessage(error) });
    }
});

router.get('/:auctionId/edit', isAuthor, async (req, res) => {
    const auction = await auctionService.getOne(req.params.auctionId);

    const categoryTypes = getCategoryTypesViewData(auction.category);

    res.render('auction/edit', { auction, categoryTypes });
});

router.post('/:auctionId/edit', isAuthor, async (req, res) => {
    const auctionData = req.body;

    try {
        await auctionService.update(req.params.auctionId, auctionData);
        res.redirect(`/auction/${req.params.auctionId}/details`);
    } catch (error) {
        res.status(400).end();
    }
});

router.get('/:auctionId/delete', isAuthor, async (req, res) => {
    await auctionService.delete(req.params.auctionId);
    res.redirect('/auction/browse');
});

router.get('/closedAuctions', async (req, res) => {
    const closedAuctions = await auctionService.getClosedAuctions(req.user._id);

    res.render('auction/closedAuctions', { closedAuctions });
});

router.get('/:auctionId/close', async (req, res) => {
    const auctionId = req.params.auctionId;

    try {
        await auctionService.closeAuction(auctionId);
        res.redirect('/auction/closedAuctions');
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});



module.exports = router;