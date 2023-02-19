const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const tripController = require('./controllers/tripController');

router.use(homeController);
router.use(authController);
router.use('/trips', tripController);
router.use('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;