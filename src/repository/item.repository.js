const { IsNull } = require("typeorm");
const { loadRepository } = require("./repository.manager");

const repository = loadRepository('Item');
async function create(payload) {
    let newItem = await repository.create(payload)
    return await repository.save(newItem);
}

async function getItemById(itemId) {
    return await repository.findOne({where: {id: itemId ?? IsNull()}});
}

async function updateItem(itemId, payload) {
    await repository.update(itemId, payload);
}

async function getItems() {
    return await repository.createQueryBuilder("item")
    .select("item")
    .addSelect("user.id")
    .leftJoin("item.user", "user")
    .getRawMany();
}

async function deleteItem(itemId) {
    await repository.delete(itemId);
}

module.exports = {create, getItemById, updateItem, getItems, deleteItem}