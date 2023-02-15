const router = require('express').Router();

const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const { getPaymentMethodViewData } = require('../utils/viewDataUtils')

router.get('/catalog', async (req, res) => {
    let crypto = await cryptoService.getAll().lean();

    res.render('crypto/catalog', { crypto });
});

router.get('/search', async (req, res) => {
    const { name, payment } = req.query;
    let crypto = await cryptoService.search(name, payment);

    const paymentMethods = getPaymentMethodViewData(payment);

    res.render('crypto/search', { crypto, paymentMethods, name });
})

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    const isOwner = crypto.owner == req.user?._id;
    const isBuyer = crypto.buyers?.some(id => id == req.user?._id);

    res.render('crypto/details', { crypto, isOwner, isBuyer });
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    try {
        await cryptoService.buy(req.user._id, req.params.cryptoId);
    } catch (error) {
        return res.status(400).render('home/404', { error: getErrorMessage(error) });
    }

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    const paymentMethods = getPaymentMethodViewData(crypto.paymentMethods);

    res.render('crypto/edit', { crypto, paymentMethods });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoData = req.body;

    await cryptoService.edit(req.params.cryptoId, cryptoData);

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/delete', async (req, res) => {
    await cryptoService.delete(req.params.cryptoId);

    res.redirect('/crypto/catalog');
});

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;

    try {
        await cryptoService.create(req.user._id, cryptoData);

    } catch (error) {
        return res.status(400).render('crypto/create', { error: getErrorMessage(error) });
    }

    res.redirect('/crypto/catalog');
});

module.exports = router;