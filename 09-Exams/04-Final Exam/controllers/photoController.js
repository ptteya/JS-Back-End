const router = require('express').Router();

const photoService = require('../services/photoService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isUser } = require('../middlewares/authMiddleware');
const { isCreator } = require('../middlewares/postMiddleware');

router.get('/create', isUser, (req, res) => {
    res.render('photo/create');
});

router.post('/create', isUser, async (req, res) => {
    const photoData = req.body;

    try {
        await photoService.create(req.user._id, photoData);
        res.redirect('/photos/catalog');
    } catch (error) {
        res.render('photo/create', { error: getErrorMessage(error), photoData });
    }
});

router.get('/catalog', async (req, res) => {
    const photos = await photoService.getAll().populate('owner');
    res.render('photo/catalog', { photos });
});

router.get('/:photoId/details', async (req, res) => {
    const photo = await photoService.getOne(req.params.photoId)
        .populate('owner')
        .populate('commentList.userId')

    const isCreator = req.user?._id == photo.owner._id;

    res.render('photo/details', { photo, isCreator });
});

router.post('/:photoId/comment', isUser, async (req, res) => {
    const { comment } = req.body;

    try {
        await photoService.comment(req.params.photoId, req.user._id, comment);
        res.redirect(`/photos/${req.params.photoId}/details`);
    } catch (error) {
        console.error(error);
        res.render('home/404');
    }

});

router.get('/:photoId/edit', isUser, isCreator, async (req, res) => {
    const photo = await photoService.getOne(req.params.photoId);
    res.render('photo/edit', { photo });
});

router.post('/:photoId/edit', isCreator, async (req, res) => {
    const photo = req.body;

    try {
        await photoService.edit(req.params.photoId, photo);
        res.redirect(`/photos/${req.params.photoId}/details`);
    } catch (error) {
        res.render('photo/edit', { error: getErrorMessage(error), photo });

    }
});

router.get('/:photoId/delete', isUser, isCreator, async (req, res) => {
    await photoService.delete(req.params.photoId);
    res.redirect('/photos/catalog');
});

module.exports = router;