const Cube = require('../models/Cube_old');
const db = require('../db.json');

exports.getCreateCube = (req, res) => {
    res.render('create');
};

exports.postCreateCube = (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    let cube = new Cube(name, description, imageUrl, difficultyLevel);

    cube.save();

    res.redirect('/');
};

exports.getDetails = (req, res) => {
    let cube = db.cubes.find(x => x.id === req.params.cubeId);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', { cube });
}