const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        if (userData.password !== userData.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }

        const existingUser = await authService.findByEmail(userData.email);

        if (existingUser) {
            throw new Error('User exists');
        }

        const token = await authService.register(userData);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login')
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})


module.exports = router;