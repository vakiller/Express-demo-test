const {Router} = require("express");
const {getAll, createItem, updateItem, deleteItem} = require("../modules/item/item.controller");

const itemRouter = Router();
itemRouter.get("", getAll);
itemRouter.post("", createItem);
itemRouter.put("/:itemId", updateItem);
itemRouter.delete("/:itemId", deleteItem);

module.exports = {itemRouter};