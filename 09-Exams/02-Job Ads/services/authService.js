const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (email, password, repeatPassword, description) => {
    //validate password
    if (password !== repeatPassword) {
        throw new Error('Passwords don\'t match');
    }

    // check for existing user
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
        throw new Error('User Exists');
    }

    //TODO validate password
    if (password.length < 5) {
        throw new Error('Password too short');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword, description });

    return this.login(email, password);
}

exports.login = async (email, password) => {
    //user exists
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    //password is valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    //generate token
    const payload = {
        _id: user._id,
        email,
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}