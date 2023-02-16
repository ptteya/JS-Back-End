const express = require('express');
const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');

const app = express();

hbsConfig(app);
expressConfig(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => console.log('Server is listening on port 3000..'));