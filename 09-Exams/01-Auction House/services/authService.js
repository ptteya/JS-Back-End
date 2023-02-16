const User = require('../models/User');

const jwt = require('../lib/jsonwebtoken');
const { JWT_SECRET } = require('../constants');

exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (userData) => {
    await User.create(userData);
    return this.login(userData.email, userData.password);
}

exports.login = async (email, password) => {
    const user = await this.findByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        firstName: user.firstName,
    }

    const token = await jwt.sign(payload, JWT_SECRET);

    return token;
}

