const { create } = require('../services/accommodationService');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('create', {
        title: 'Host New Accommodation'
    });
});

router.post('/', async (req, res) => {

    try {
        const result = await create(req.body);
        res.redirect('/catalog/' + result.id);

    } catch (err) {
        res.render('create', {
            title: 'Request Error'
        });
    }
})

module.exports = router;