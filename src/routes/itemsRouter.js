const { Router } = require("express");
const itemsController = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);

itemsRouter.get("/new", itemsController.createItemGet);
itemsRouter.post("/new", itemsController.createItemPost);

itemsRouter.get("/:id", itemsController.editItemGet);
itemsRouter.post("/:id/update", itemsController.editItemPost);

itemsRouter.post("/:id/delete", itemsController.deleteItemPost);

module.exports = itemsRouter;
