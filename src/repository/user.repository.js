const { IsNull } = require("typeorm");
const { loadRepository } = require("./repository.manager");

const repository = loadRepository('User');
async function createUser(payload) {
    let newUser = await repository.create(payload)
    await repository.save(newUser);
}

async function getUserById(userId) {
    return await repository.findOne({where: {id: userId ?? IsNull()}});
}

async function getUserByUsername(username) {
    return await repository.findOne({where: {username: username ?? IsNull()}});
}

module.exports = {createUser, getUserById, getUserByUsername}