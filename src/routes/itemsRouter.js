const { Router } = require("express");
const {
	getAllItems,
	getItemById,
	updateItemPost,
} = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);
itemsRouter.get("/:id", getItemById);
itemsRouter.post("/:id/update", updateItemPost);

module.exports = itemsRouter;
