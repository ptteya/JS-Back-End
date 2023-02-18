const router = require('express').Router();

const adsService = require('../services/adsService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isUser } = require('../middlewares/authMiddleware');
const { isAuthor } = require('../middlewares/adMiddleware');

router.get('/create', isUser, (req, res) => {
    res.render('ads/create');
});

router.post('/create', isUser, async (req, res) => {
    const ad = req.body;

    try {
        await adsService.create(req.user._id, ad);
        res.redirect('/ads/catalog');
    } catch (error) {
        console.error(error);
        res.render('ads/create', { error: getErrorMessage(error), ad });
    }
});

router.get('/catalog', async (req, res) => {
    const ads = await adsService.getAll();
    res.render('ads/catalog', { ads });
});


router.get('/:adId/details', async (req, res) => {
    const ad = await adsService.getOne(req.params.adId)
        .populate('author')
        .populate('usersApplied');

    const isAuthor = ad.author._id == req.user?._id;
    const hasApplied = ad.usersApplied.some(x => x._id == req.user?._id);

    res.render('ads/details', { ad, isAuthor, hasApplied });
});


router.get('/:adId/apply', isUser, async (req, res) => {
    try {
        await adsService.apply(req.params.adId, req.user._id);
        res.redirect(`/ads/${req.params.adId}/details`);
    } catch (error) {
        console.error(error);
        res.render('home/404');
    }
});

router.get('/:adId/edit', isUser, isAuthor, async (req, res) => {
    const ad = await adsService.getOne(req.params.adId);
    res.render('ads/edit', { ad });
});

router.post('/:adId/edit', isUser, isAuthor, async (req, res) => {
    const updatedAdData = req.body;
    const adId = req.params.adId;

    try {
        await adsService.edit(adId, updatedAdData);
        res.redirect(`/ads/${adId}/details`);
    } catch (error) {
        res.render(`ads/edit`, { error: getErrorMessage(error), ad: updatedAdData });
    }
});

router.get('/:adId/delete', isUser, isAuthor, async (req, res) => {
    await adsService.delete(req.params.adId);
    res.redirect('/ads/catalog');
});

router.get('/search', async (req, res) => {
    const { email } = req.query;

    const matches = await adsService.search(email);

    res.render('ads/search', { matches, email });
});

module.exports = router;