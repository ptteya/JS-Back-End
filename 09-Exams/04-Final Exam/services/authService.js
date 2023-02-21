const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.findByUsername = (username) => User.findOne({ username });

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Passwords don\'t match');
    }

    const existingUsername = await this.findByUsername(username);
    const existingEmail = await this.findByEmail(email);

    if (existingUsername || existingEmail) {
        throw new Error('User Exists');
    }

    if (password.length < 4) {
        throw new Error('Password too short');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    return this.login(username, password);
}

exports.login = async (username, password) => {
    const user = await this.findByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const payload = {
        _id: user._id,
        email: user.email,
        username,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}