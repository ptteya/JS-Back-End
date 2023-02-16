const express = require('express');
const cookieParser = require('cookie-parser');

function expressConfig(app) {
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
}

module.exports = expressConfig;