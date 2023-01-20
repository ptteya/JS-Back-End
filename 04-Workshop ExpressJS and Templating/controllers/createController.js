const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Host New Accommodation'
    });
});

module.exports = router;