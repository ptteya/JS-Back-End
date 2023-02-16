const mongoose = require('mongoose');

const { DB_Connection_String } = require('../constants');

async function initDatabase() {
    mongoose.set('strictQuery', false);

    await mongoose.connect(DB_Connection_String);

    console.log('DB connected');
}

module.exports = initDatabase;