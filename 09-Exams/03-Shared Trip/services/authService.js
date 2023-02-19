const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, password, repeatPassword, gender) => {
    if (password !== repeatPassword) {
        throw new Error('Passwords don\'t match');
    }

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
        throw new Error('User Exists');
    }

    if (password.length < 4) {
        throw new Error('Password too short');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, gender });

    return this.login(email, password);
}

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        gender: user.gender
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}