const handlebars = require('express-handlebars');

function hbsConfig(app) {
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
}

module.exports = hbsConfig;