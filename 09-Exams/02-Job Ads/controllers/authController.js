const router = require('express').Router();

const authService = require('../services/authService');
const { isUser, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { email, password, repeatPassword, description } = req.body;

    try {
        const token = await authService.register(email, password, repeatPassword, description);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('auth/register', { error: getErrorMessage(error) });
    }
});

router.get('/login', isGuest, async (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        return res.render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/logout', isUser, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;