const router = require('express').Router();

const authService = require('../services/authService');

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

        await authService.create(userData);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token);
    res.redirect('/');
});


module.exports = router;