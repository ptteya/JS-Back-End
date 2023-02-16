const express = require('express');
const cookieParser = require('cookie-parser');

const { authentication } = require('../middlewares/authMiddleware');

function expressConfig(app) {
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(authentication);
}

module.exports = expressConfig;