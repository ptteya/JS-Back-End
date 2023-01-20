const { getAll, getById } = require('../services/accommodationService');

const router = require('express').Router();

router.get('/', (req, res) => {
    const rooms = getAll();
    res.render('catalog', {
        title: 'All Accommodations',
        rooms
    });
});

router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const room = getById(roomId);

    if (room) {
        res.render('details', {
            title: 'Accommodations Details',
            room
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accommodation Details',
            roomId
        });
    }
});

module.exports = router;
