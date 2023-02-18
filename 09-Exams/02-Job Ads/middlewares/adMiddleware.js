const adsService = require('../services/adsService');

exports.isAuthor = async (req, res, next) => {
    const ad = await adsService.getOne(req.params.adId);

    if (ad.author == req.user?._id) {
        next();
    } else {
        res.redirect('/');
    }
}