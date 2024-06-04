const { AppDataSource } = require('../../database/data-source');
const { createNotFoundError } = require('../../helpers/CustomErrors');
const {encryptPassword, generateToken, comparePassword} = require('../../helpers/token-helpers'); 
const { createUser, getUserByUsername } = require('../../repository/user.repository');

async function signUpNewUser(payload) {
    const {username, password} = payload;
    const hashedPassword = await encryptPassword(password);
    const newUserPayload = {...payload, password: hashedPassword, role: "user"};

    await createUser(newUserPayload);
    console.log("JWT ", process.env.JWT_EXPIRES_IN, process.env.JWT_SECRET);
    const token = await generateToken(
        {username, password, role: "user"}, 
        process.env.JWT_EXPIRES_IN, 
        process.env.JWT_SECRET);

    const refreshToken = await generateToken(
        {username, password, role: "user"}, 
        process.env.JWT_REFRESH_EXPIRES_IN, 
        process.env.JWT_REFRESH_SECRET);

    return {username, refreshToken, token};
}

async function signInUser(payload) {
    const {username, password} = payload;
    const user = await getUserByUsername(username);
    if (!user || user === null) {
        throw new createNotFoundError("User Not Found");
    }
    const isValidPassword = await comparePassword(user.password, password);

    if (!isValidPassword) {
        throw new NotAuthorizedError("Invalid password");
    }

    const token = await generateToken(
        {username, password, role: user.role}, 
        process.env.JWT_EXPIRES_IN, 
        process.env.JWT_SECRET);
    
    const refreshToken = await generateToken(
        {username, password, role: user.role}, 
        process.env.JWT_REFRESH_EXPIRES_IN, 
        process.env.JWT_REFRESH_SECRET
    );
    return {username, refreshToken, token};
}

module.exports = {signUpNewUser, signInUser}