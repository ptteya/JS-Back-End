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

        const token = await authService.register(userData);

        console.log(token);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
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

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})


module.exports = router;