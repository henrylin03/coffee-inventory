const { Router } = require("express");
const {
	createItemGet,
	createItemPost,
	getAllItems,
	getItemById,
	updateItemPost,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);

itemsRouter.get("/new", createItemGet);
itemsRouter.post("/new", createItemPost);

itemsRouter.get("/:id", getItemById);
itemsRouter.post("/:id/update", updateItemPost);

module.exports = itemsRouter;
