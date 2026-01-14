const { Router } = require("express");
const { getAllItems, getItemById } = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);
itemsRouter.get("/:id", getItemById);

module.exports = itemsRouter;
