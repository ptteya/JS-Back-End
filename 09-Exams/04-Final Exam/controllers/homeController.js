const router = require('express').Router();
const photoService = require('../services/photoService');
const { isUser } = require('../middlewares/authMiddleware');


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/profile', isUser, async (req, res) => {
    const userId = req.user._id;

    const photos = await photoService.getPhotosByUserId(userId);

    res.render('home/profile', { photos });
});

module.exports = router;