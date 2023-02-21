const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');

router.use(homeController);
router.use(authController);
router.use('/photos', photoController);
router.use('*', (req, res) => {
    res.render('home/404');
});

module.exports = router;