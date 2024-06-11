const jwt = require('jsonwebtoken');
const { BadRequestError, NotFoundError, NotAuthorizedError } = require('../../helpers/CustomErrors');
const {encryptPassword, generateToken, comparePassword} = require('../../helpers/token-helpers'); 
const { createUser, getUserByUsername } = require('../../repository/user.repository');
const { setStringRedis, getStringRedis } = require('../../redis/redis-helper');

async function signUpNewUser(payload) {
    const {username, password} = payload;
    if (!username || !password) {
        throw BadRequestError('Username and password are required');
    }

    const hashedPassword = await encryptPassword(password);
    const newUserPayload = {...payload, password: hashedPassword, role: "user"};

    await createUser(newUserPayload);

    try {
        const [token, refreshToken] = await generateRefreshAndToken(username, password, "user")
        await setStringRedis(username, refreshToken, process.env.JWT_REFRESH_EXPIRES_IN);
        return {username, refreshToken, token};
    } catch (error) {
        console.log("Exception from auth.service.js: ",error.message);
        throw error;
    }
    
}

async function signInUser(payload) {
    const {username, password} = payload;
    if (!username || !password) {
        throw BadRequestError("Username and password are required");
    }
    
    const user = await getUserByUsername(username);
    if (!user || user === null) {
        throw new NotFoundError("User Not Found");
    }
    const isValidPassword = await comparePassword(user.password, password);

    if (!isValidPassword) {
        throw new NotAuthorizedError("Invalid password");
    }

    try {
        const [token, refreshToken] = await generateRefreshAndToken(username, password, "user")
        await setStringRedis(username, refreshToken, process.env.JWT_REFRESH_EXPIRES_IN);
        return {username, refreshToken, token};
    } catch (error) {
        console.log("Exception from auth.service.js: ",error.message);
        throw error;
    }
}

async function refreshTokenUser(refreshTokenRequest) {
    const verified = jwt.verify(refreshTokenRequest, process.env.JWT_REFRESH_SECRET);
    if (!verified) {
        throw NotAuthorizedError("Invalid refresh token");
    }
    const {username, password, role} = verified;
    
    const refreshToken = await getStringRedis(username);
    
    if (refreshToken !== refreshTokenRequest) {
        throw NotAuthorizedError("Invalid refresh token");
    }

    try {
        const [token, refreshToken] = await generateRefreshAndToken(username, password, role);
        await setStringRedis(username, refreshToken, process.env.JWT_REFRESH_EXPIRES_IN);
        return {username, refreshToken, token};
    } catch (error) {
        console.log("Exception from auth.service.js: ",error.message);
        throw error;
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