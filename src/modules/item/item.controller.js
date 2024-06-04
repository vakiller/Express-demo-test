const { getAllItems, createNewItem, updateItemIfExist, deleteItemIfExist } = require("./item.service");

async function createItem(req, res, next) {
    try {
        const result = await createNewItem(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function updateItem(req, res, next) {
    try {
        const result = await updateItemIfExist(req.params.itemId, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getAll(req, res, next) {
    try {
        const result = await getAllItems();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function deleteItem(req, res, next) {
    try {
        await deleteItemIfExist(req.params.itemId);
        res.json({message: "Item Deleted"});
    } catch (error) {
        next(error);
    }
}

module.exports = { createItem, updateItem, getAll, deleteItem };