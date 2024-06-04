const {Router} = require("express");
const {getAll, createItem, updateItem, deleteItem} = require("../modules/item/item.controller");
const { authorizeRoles } = require("../middlewares/authorize");

const itemRouter = Router();
itemRouter.get("", getAll);
itemRouter.post("", createItem);
itemRouter.put("/:itemId",authorizeRoles("admin"), updateItem);
itemRouter.delete("/:itemId",authorizeRoles("admin"), deleteItem);

module.exports = {itemRouter};