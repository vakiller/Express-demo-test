const {encryptPassword, generateToken} = require('../../helpers/token-helpers'); 

async function signUpNewUser(payload) {
    const {username, password} = payload;
        const hashedPassword = await encryptPassword(password);
        const newUser = new User();
        newUser.username = username;
        newUser.password = hashedPassword;
        newUser.role = Role.USER;
        await this.repository.save(newUser);
        console.log("JWT ", process.env.JWT_EXPIRES_IN, process.env.JWT_SECRET);
        const token = await generateToken(
            {username, password, role: Role.USER}, 
            process.env.JWT_EXPIRES_IN, 
            process.env.JWT_SECRET);

        const refreshToken = await generateToken(
            {username, password, role: Role.USER}, 
            process.env.JWT_REFRESH_EXPIRES_IN, 
            process.env.JWT_REFRESH_SECRET);

        return {username, refreshToken, token};
}

module.exports = {signUpNewUser}