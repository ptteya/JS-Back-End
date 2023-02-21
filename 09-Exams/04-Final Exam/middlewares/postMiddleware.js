const photoService = require('../services/photoService');

exports.isCreator = async (req, res, next) => {
    const post = await photoService.getOne(req.params.photoId);

    if (post.owner == req.user?._id) {
        next();
    } else {
        res.redirect('/');
    }
}