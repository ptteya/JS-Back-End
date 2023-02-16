const jwt = require('../lib/jsonwebtoken');
const { JWT_SECRET } = require('../constants');

exports.authentication = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, JWT_SECRET);

            req.user = decodedToken;
            req.locals.isAuthenticated = true;
            req.locals.user = decodedToken;
        } catch (error) {
            return res.status(401).render('404');
        }
    }

    next();
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }

    next();
}