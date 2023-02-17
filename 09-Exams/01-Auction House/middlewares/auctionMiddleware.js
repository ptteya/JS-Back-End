const auctionService = require('../services/auctionService');

exports.isAuthor = async (req, res, next) => {
    const auction = await auctionService.getOne(req.params.auctionId);

    if (auction.author == req.user?._id) {
        next();
    } else {
        res.redirect(`/auction/${req.params.auctionId}/details`);
    }
}