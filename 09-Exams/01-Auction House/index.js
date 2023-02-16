const express = require('express');
const routes = require('./routes');
const hbsConfig = require('./config/hbsConfig');
const expressConfig = require('./config/expressConfig');

const app = express();

hbsConfig(app);
expressConfig(app);

app.use(routes);



app.listen(3000, () => console.log('Server is listening on port 3000..'));