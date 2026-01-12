const { Router } = require("express");
const { getAllItems } = require("../controllers/itemsController");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);

module.exports = itemsRouter;
