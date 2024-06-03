const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptPassword = async (rawPass) => {
    return bcrypt.hash(rawPass, 10);
}

const comparePassword = async (hashPassword, password) => {
    return bcrypt.compare(password, hashPassword);
}

const generateToken = async (payload, expiresIn, secretKey) => {
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn});
}

module.exports = {encryptPassword, comparePassword, generateToken}