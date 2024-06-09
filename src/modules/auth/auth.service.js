const { createNotFoundError, createUnAuthorizedError, createBadRequestError } = require('../../helpers/CustomErrors');
const {encryptPassword, generateToken, comparePassword} = require('../../helpers/token-helpers'); 
const { create } = require('../../repository/item.repository');
const { createUser, getUserByUsername } = require('../../repository/user.repository');
const jwt = require('jsonwebtoken');

async function signUpNewUser(payload) {
    const {username, password} = payload;
    if (!username || !password) {
        throw createBadRequestError("Username and password are required");
    }

    const hashedPassword = await encryptPassword(password);
    const newUserPayload = {...payload, password: hashedPassword, role: "user"};

    await createUser(newUserPayload);
    console.log("JWT ", process.env.JWT_EXPIRES_IN, process.env.JWT_SECRET);

    try {
        const [token, refreshToken] = await generateRefreshAndToken(username, password, "user")
        return {username, refreshToken, token};
    } catch (error) {
        throw createBadRequestError("Error generating token: "+error.message);
    }
    
}

async function signInUser(payload) {
    const {username, password} = payload;
    if (!username || !password) {
        throw createBadRequestError("Username and password are required");
    }
    
    const user = await getUserByUsername(username);
    if (!user || user === null) {
        throw new createNotFoundError("User Not Found");
    }
    const isValidPassword = await comparePassword(user.password, password);

    if (!isValidPassword) {
        throw new createUnAuthorizedError("Invalid password");
    }

    try {
        const [token, refreshToken] = await generateRefreshAndToken(username, password, "user")
        return {username, refreshToken, token};
    } catch (error) {
        throw createBadRequestError("Error generating token: "+error.message);
    }
}

async function refreshTokenUser(refreshTokenRequest) {
    const verified = jwt.verify(refreshTokenRequest, process.env.JWT_REFRESH_SECRET);
    if (!verified) {
        throw createUnAuthorizedError("Invalid refresh token");
    }
    const {username, password, role} = verified;
    
    try {
        const [token, refreshToken] = await generateRefreshAndToken(username, password, role)
        return {username, refreshToken, token};
    } catch (error) {
        throw createBadRequestError("Error generating token: "+error.message);
    }
}

function generateRefreshAndToken(username, password, role) {
    return Promise.all([
        generateToken(
            {username, password, role}, 
            process.env.JWT_EXPIRES_IN, 
            process.env.JWT_SECRET),
        generateToken(
            {username, password, role}, 
            process.env.JWT_REFRESH_EXPIRES_IN, 
            process.env.JWT_REFRESH_SECRET)
    ])
}

module.exports = {signUpNewUser, signInUser, refreshTokenUser}