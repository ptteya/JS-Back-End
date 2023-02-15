const express = require('express');
const setupViewEngine = require('./config/viewEngine');
const cookieParser = require('cookie-parser');
const initDatabase = require('./config/databaseInit');

const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware')

const app = express();
setupViewEngine(app);

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

initDatabase();

app.listen(3000, () => console.log('Server is listening on port 3000...'));