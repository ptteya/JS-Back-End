const express = require('express');

const routes = require('./routes');
const { PORT } = require('./constants');
const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');
const initDatabase = require('./config/databaseInit');

const app = express();

hbsConfig(app);
expressConfig(app);

app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}..`));
    })
    .catch((err) => {
        console.log('Cannot connect database: ', err)
    });