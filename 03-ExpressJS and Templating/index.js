const express = require('express');
const handlebars = require('express-handlebars');

const loggerMiddleware = require('./loggerMiddleware');

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats', (req, res) => {
    const cats = [
        { name: 'Bella', breed: 'Persian', age: 7 },
        { name: 'Ani', breed: 'Angora', age: 5 },
        { name: 'Garry', breed: 'Persian', age: 8 },
    ];
    res.render('cats', { cats });
});

app.get('/cats/1', (req, res) => {
    res.download('./cat.png');
});

let validateCatIdMiddleware = (req, res, next) => {
    let catId = Number(req.params.catId);

    if (!catId) {
        return res.send('Invalid CatId');
        // return res.redirect('/404');
    }

    req.catId = catId;

    next();
}

app.get('/cats/:catId', validateCatIdMiddleware, (req, res) => {
    res.render('cat', { id: req.params.catId, isOdd: req.catId % 2 != 0 });
});

app.get('/dogs', (req, res) => {
    res.send('<h1>Dogs Page</h1>');
});

app.post('/cats', (req, res) => {
    res.send('cat is received');
});

app.put('/cats', (req, res) => {
    res.send('cat is updated');
});

app.delete('/cats', (req, res) => {
    res.send('cat is deleted');
});

app.get('/json', (req, res) => {
    res.json({ ok: true, message: 'hello from json' });
});

app.get('/redirect', (req, res) => {
    res.redirect('/redirected');
});

app.get('/redirected', (req, res) => {
    res.send('This is redirected page');
});

app.get('*', (req, res) => {
    res.send('<h1>404</h1>');
})

app.listen(5000, () => console.log('Server is listening on port 5000...'));
