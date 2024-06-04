const {create, getItems, getItemById, deleteItem, updateItem} = require('../../repository/item.repository');
const {getUserById} = require('../../repository/user.repository');
const {createNotFoundError, createBadRequestError} = require('../../helpers/CustomErrors');

async function getAllItems() {
    const allItems = await getItems();
    return {allItems};    
}

async function createNewItem(payload) {
    const user = await getUserById(payload.userId);
    if (!user || user === null) {
        throw new createNotFoundError("User Not Found");
    }
    if (!payload || payload === null) { 
        throw new createBadRequestError("Invalid Payload");    
    }

    const bodyNewItem = {
        name: payload.name,
        damage: payload.damage,
        description: payload.description,
        price: payload.price,
        user: {id: user.id}
    };

    const item = await create(bodyNewItem);
    return {item};
}

async function updateItemIfExist(itemId, payload) {
    const itemExisted = await getItemById(itemId);
    if (!itemExisted || itemExisted === null) {
        throw new createNotFoundError("Item Not Found");
    }
    const user = await getUserById(payload.userId);
    if (!user || user === null) {
        throw new createNotFoundError("User Not Found");
    }

    const bodyUpdateItem = {
        name: payload.name,
        damage: payload.damage,
        description: payload.description,
        price: payload.price,
        user: {id: user.id}
    };

    await updateItem(itemId, bodyUpdateItem);
    const item = await getItemById(itemId);
    return {item};
}

async function deleteItemIfExist(itemId) {
    const itemExisted = await getItemById(itemId);
    if (!itemExisted || itemExisted === null) {
        throw new createNotFoundError("Item Not Found");
    }
    await deleteItem(itemId);
}

module.exports = {getAllItems, createNewItem, updateItemIfExist, deleteItemIfExist};
