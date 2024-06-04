const {Router} = require("express");
const {getAll, createItem, updateItem, deleteItem} = require("../modules/item/item.controller");
const { authorizeRoles } = require("../middlewares/authorize");
const { validateBody } = require("../middlewares/validate-body");
const { itemSchema } = require("../validation/item.validation");

const itemRouter = Router();
itemRouter.get("", getAll);
itemRouter.post("",validateBody(itemSchema),createItem);
itemRouter.put("/:itemId",validateBody(itemSchema),authorizeRoles("admin"), updateItem);
itemRouter.delete("/:itemId",authorizeRoles("admin"), deleteItem);

module.exports = {itemRouter};