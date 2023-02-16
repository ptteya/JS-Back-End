const router = require('express').Router();

const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
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

        console.log(token);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) });
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})


module.exports = router;