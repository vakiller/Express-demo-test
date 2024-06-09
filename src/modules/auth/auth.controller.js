const { createBadRequestError } = require('../../helpers/CustomErrors');
const {signUpNewUser, signInUser, refreshTokenUser} = require('./auth.service');

async function signup(req, res, next) {
    try {
        const result = await signUpNewUser(req.body);
        res.json(result);   
    } catch (error) {
        next(error);
    }
}

async function signin(req, res, next) {
    try {
        const result = await signInUser(req.body);
        res.json(result);   
    } catch (error) {
        next(error);
    }
}

async function refreshToken(req, res, next) {
    try {
        if (!req.body.refreshToken || req.body.refreshToken === null) {
            throw createBadRequestError("Refresh Token is required");
        }
        const result = await refreshTokenUser(req.body.refreshToken);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { signup, signin, refreshToken };